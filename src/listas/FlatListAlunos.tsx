import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { Context } from "../data/Provider";
import Globais from '../data/Globais';

type ItemData = {
  nome: string;
  numero: string;
  inativo: string;
  idAluno: string;
  mediaNotas: string;
  porcentFreq: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  onLongPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, onLongPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={[styles.item, { backgroundColor }]}>
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: textColor }]}>{item.numero}      </Text>
      </View>
      <View style={{ flex: 15 }}>
        <Text style={[styles.title, { color: textColor }]}>{item.nome}</Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <Text>Média: {item.mediaNotas || ' ...'}</Text>
      <Text>%Freq: {item.porcentFreq || ' ...'}</Text>
    </View>
  </TouchableOpacity>
);

const FlatListAlunos = () => {
  const alunos: any[] = []
  const { flagLoadAlunos, setflagLoadAlunos, idPeriodoSelec, idClasseSelec,
    setNumAlunoSelec, setRecarregarAlunos, recarregarAlunos, setFlagLongPressClasse,
    listaAlunos, setListaAlunos, idUsuario, setFlagLongPressAluno,
    selectedIdAluno, setSelectedIdAluno, setNomeAlunoSelec, setIdAlunoSelec, setAlunoInativo } = useContext(Context)

  let listaAlunosRef = firestore().collection(idUsuario)
    .doc(idPeriodoSelec).collection('Classes')
    .doc(idClasseSelec).collection('ListaAlunos')

  useEffect(() => {
    const data = async () => {
      setListaAlunos('');
      setRecarregarAlunos('');
      setflagLoadAlunos('carregando');
      listaAlunosRef.orderBy('numero')
        .onSnapshot((snapshot) => {
          if (snapshot.empty && idClasseSelec != '') {
            setflagLoadAlunos('vazio');
          } else {
            snapshot.forEach((docSnapshot, index) => {
              if (snapshot.size - index == 1) {
                setflagLoadAlunos('carregado');
              }

              //recuperação das datas de frequencia e cálculo da porcentagem de frequência
              let contFreq = 0, somaNotas = 0, porcentFreq, mediaNotas 
              let frequencias = docSnapshot.data().frequencias
              let notas = docSnapshot.data().notas
              console.log('notas',notas);

              //recuperar porcentagem de frequências
              if(Object.keys(frequencias).length>0){
                let qntDatas = Object.keys(frequencias).length
                frequencias.forEach((item:any)=>{
                  item.freq=='P' ? contFreq+=1 : null
                })
                porcentFreq = ((contFreq*100)/qntDatas).toFixed(1)
              }else{
                porcentFreq = 0
              }
              
              //recuperar média das notas
              if(Object.keys(notas).length>0){
                let qntDatas = Object.keys(notas).length
                notas.forEach((item:any)=>{
                  item.nota=='' ? null : somaNotas += item.nota
                })
                mediaNotas = ((somaNotas)/qntDatas).toFixed(1)
              }else{
                mediaNotas = 0
              }

              alunos.push({...docSnapshot.data(),porcentFreq,mediaNotas})
            })
          }
        });
        setListaAlunos(alunos)


    }
    data()
  }, [idPeriodoSelec, idClasseSelec, recarregarAlunos]);

  const onPressItem = (item: any) => {
    setSelectedIdAluno(item.idAluno)
    setIdAlunoSelec(item.idAluno)
    setNomeAlunoSelec(item.nome)
    setNumAlunoSelec(item.numero.toString())
    setFlagLongPressAluno(false)
  }

  const onLongPressItem = (item: any) => {
    setSelectedIdAluno(item.idAluno)
    setIdAlunoSelec(item.idAluno)
    setNomeAlunoSelec(item.nome)
    setNumAlunoSelec(item.numero.toString())
    setAlunoInativo(item.inativo)
    setFlagLongPressAluno(true)
    setFlagLongPressClasse(false)
  }

  const renderItem = ({ item }: { item: ItemData }) => {
    let backgroundColor = ''
    if (item.inativo) {
      backgroundColor = Globais.corAlunoInativo
    } else {
      backgroundColor = item.idAluno === selectedIdAluno ? Globais.corPrimaria : Globais.corTerciaria;
    }
    const color = item.idAluno === selectedIdAluno ? Globais.corTextoClaro : Globais.corTextoEscuro;

    return (
      <Item
        item={item}
        onPress={() => onPressItem(item)}
        onLongPress={() => onLongPressItem(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderCarregamento = () => {
    if (idClasseSelec != '') {
      switch (flagLoadAlunos) {
        case 'vazio':
          return (
            <View>
              <Text style={styles.textLoad}>Adicione os alunos...</Text>
            </View>
          )
        case 'carregando':
          return (
            <View>
              <Text style={styles.textLoad}>Carregando...</Text>
            </View>
          )
        case 'carregado':
          return (
            <FlatList
              data={listaAlunos}
              renderItem={renderItem}
              keyExtractor={item => item.idAluno}
              extraData={selectedIdAluno}
            />
          )
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderCarregamento()}
    </SafeAreaView>
  );
};

export default FlatListAlunos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  item: {
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
  },
  textLoad: {
    fontSize: 24,
    color: Globais.corTextoClaro,
  }
});

