import React, { useContext, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Context } from "../data/Provider";
import Globais from '../data/Globais';
import firestore from '@react-native-firebase/firestore';

LocaleConfig.locales.br = {
  monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  monthNamesShort: ["Jan.", "Fev.", "Mar", "Abr", "Mai", "Jun", "Jul.", "Ago", "Set.", "Out.", "Nov.", "Dez."],
  dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
};

LocaleConfig.defaultLocale = "br";

const CalendarioNota = () => {

  let datasMarcadas: any = {}
  const datas: any[] = [];

  const { idPeriodoSelec, idClasseSelec, dataSelec,
    setDataSelec, modalCalendarioNota, setModalCalendarioNota } = useContext(Context);
  const { flagLoadCalendarioNotas, setflagLoadCalendarioNotas, setFlagLoadNotas,
    listaDatasNotas, setListaDatasNotas, setRecarregarNotas, recarregarCalendarioNotas,
    setRecarregarCalendarioNotas, listaDatasMarcadasNotas, setListaDatasMarcadasNotas,
    idUsuario, nomePeriodoSelec, nomeClasseSelec, setRecarregarAlunos } = useContext(Context)

  let listaAlunosRef = firestore().collection(idUsuario)
    .doc(idPeriodoSelec).collection('Classes')
    .doc(idClasseSelec).collection('ListaAlunos')

  let datasNotasRef = firestore().collection(idUsuario)
    .doc(idPeriodoSelec).collection('Classes')
    .doc(idClasseSelec).collection('DatasNotas')
  
    useEffect(() => {
    const data = async () => {
      /* essa consulta no BD retorna as datas ainda não 
      incluídas na lista de datas. */
      setflagLoadCalendarioNotas('carregando');
      setListaDatasNotas('');
      setListaDatasMarcadasNotas({})
      setRecarregarCalendarioNotas('');
      firestore().collection(idUsuario)
        .doc(idPeriodoSelec).collection('Classes')
        .doc(idClasseSelec).collection('Notas')
        .onSnapshot(snapshot => {
          if (snapshot.empty) {
            setflagLoadCalendarioNotas('carregado');
          }
          snapshot.forEach((documentSnapshot, index) => {
            datas.push(documentSnapshot.id);
            datasMarcadas[documentSnapshot.id] = { selected: true }
            if (snapshot.size - index == 1) {
              setflagLoadCalendarioNotas('carregado')
            }
          });
        });
      setListaDatasNotas(datas);
      setListaDatasMarcadasNotas(datasMarcadas)
    }
    data()
  }, [idClasseSelec, recarregarCalendarioNotas]);

  const onPressAddData = async () => {

    setModalCalendarioNota(!modalCalendarioNota);

    setflagLoadCalendarioNotas('inicio')
    firestore().collection(idUsuario)
      .doc(idPeriodoSelec).collection('Classes')
      .doc(idClasseSelec).collection('Notas')
      .doc(dataSelec).set({});

    firestore().collection(idUsuario)
      .doc(idPeriodoSelec).collection('Classes')
      .doc(idClasseSelec).collection('ListaAlunos')
      .orderBy('numero')
      .onSnapshot(snapshot => {
        snapshot.forEach(documentSnapshot => {
          const numero = documentSnapshot.data().numero;
          const nome = documentSnapshot.data().nome;
          const idAluno = documentSnapshot.data().idAluno;

          firestore().collection(idUsuario)
            .doc(idPeriodoSelec).collection('Classes')
            .doc(idClasseSelec).collection('Notas')
            .doc(dataSelec).collection('Alunos')
            .doc(idAluno).set({
              numero: numero,
              nome: nome,
              nota: '',
              idAluno: idAluno,
            }).then(setRecarregarNotas('recarregarNotas'),
              setRecarregarAlunos('recarregarALunos'))
        });
      });

    //atualizando o estado da data
    firestore().collection(idUsuario).
      doc('EstadosApp').update({
        idPeriodo: idPeriodoSelec,
        periodo: nomePeriodoSelec,
        idClasse: idClasseSelec,
        classe: nomeClasseSelec,
        data: dataSelec
      })

  }

  const renderCarregamento = () => {
    if (idClasseSelec != '') {
      switch (flagLoadCalendarioNotas) {
        case 'carregando':
          return (
            <View>
              <Text style={styles.textLoad}>Carregando...</Text>
            </View>
          )
        case 'carregado':
          return (
            <View style={styles.container}>
              <Calendar
                onDayPress={day => {
                  setDataSelec(day.dateString);
                  setFlagLoadNotas('carregando');
                  setRecarregarNotas('recarregarFrequencia');
                  if (listaDatasNotas.includes(day.dateString)) {
                    setModalCalendarioNota(!modalCalendarioNota)

                    //atualizando o estado da data
                    firestore().collection(idUsuario).
                      doc('EstadosApp').update({
                        idPeriodo: idPeriodoSelec,
                        periodo: nomePeriodoSelec,
                        idClasse: idClasseSelec,
                        classe: nomeClasseSelec,
                        data: day.dateString,
                      })
                  }
                }}
                markedDates={listaDatasMarcadasNotas}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => [onPressAddData(), setflagLoadCalendarioNotas('carregando')]}>
                <Text style={styles.textStyle}>Criar data</Text>
              </Pressable>
            </View>
          )
      }
    }
  }

  return (
    <View>
      {renderCarregamento()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Globais.corPrimaria,
    marginTop: 24,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textLoad: {
    fontSize: 24,
    color: Globais.corTextoClaro,
  }
});

export default CalendarioNota;