import React, { useContext, useEffect, useState } from 'react'
import {SafeAreaView, FlatList, View, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "./data/Provider";
import Globais from './Globais';
import { TextInput } from 'react-native-paper';

type ItemData = {
  nome: string;
  numero: string;
  nota: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const FlatListNotas= () => {
  const alunos:any[] = []
  const [selectedId, setSelectedId] = useState<string>();
  const {periodoSelec,classeSelec,setNumAlunoSelec,recarregarFrequencia,
    dataSelec,flagLoadFrequencia,setFlagLoadFrequencia,setRecarregarFrequencia,
    listaFrequencia,setListaFrequencia,valueNota,setValueNota} = useContext(Context)

  const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
    <View style={styles.containerItem}>
      <View style={[styles.item, styles.nome]}>
        <Text style={[styles.title]}>{item.numero} {item.nome}</Text>
      </View>
      <View>
        <TextInput 
        style={styles.itemNota}
        placeholder='Nota'
        inputMode='numeric'
        // onSubmitEditing={()=>onPressItemNota(item)}
        onChangeText={onChangeInputNota}
        value={item.nota}>
        </TextInput>
      </View>
    </View>
  );
  
  const onChangeInputNota = (text:String) =>{
    setValueNota(text)
    console.log('changing',valueNota)
  }

  useEffect(()=>{
    const data = async ()=>{
      
      setListaFrequencia([{numero:'',nome:'',nota:''}]);
      setRecarregarFrequencia('');
      console.log('useEffect lista frequencia');
      setFlagLoadFrequencia('carregando');
      firestore().collection('Usuario')
      .doc(periodoSelec).collection('Classes')
      .doc(classeSelec).collection('Frequencia')
      .doc(dataSelec).collection('Alunos')
      .orderBy('numero')
      .onSnapshot(snapshot => {
        if(snapshot.empty){
          setFlagLoadFrequencia('vazio');
        }else{
          snapshot.forEach((documentSnapshot,index) => {
          alunos.push(documentSnapshot.data());
            if(snapshot.size-index==1){
              setFlagLoadFrequencia('carregado');
              console.log('entrou no if da flag frequencia')
            }
          });
        }    
      });
      setListaFrequencia(alunos)
    }
    data()        
  },[classeSelec,recarregarFrequencia,dataSelec]);

  const onPressItemNota = (item:any) =>{
    const numAluno = item.numero;
    setSelectedId(item.numero);
    setNumAlunoSelec(item.numero.toString());
    firestore().collection('Usuario')
    .doc(periodoSelec).collection('Classes')
    .doc(classeSelec).collection('Notas')
    .doc(dataSelec).collection('Alunos')
    .doc(numAluno+'').set({
        numero:item.numero,
        nome:item.nome,
        nota:item.nota
    });
    console.log('entrouNoPressNota')
    setRecarregarFrequencia('atualizarFrequencia')
  }

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.numero === selectedId ? Globais.corPrimaria : Globais.corTerciaria;
    const color = item.numero === selectedId ? Globais.corTextoClaro : Globais.corTextoEscuro;

    return (
      <Item
        item={item}
        onPress={() => onPressItemNota(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderCarregamento = () =>{
    if(classeSelec!=''){
      if(dataSelec!=''){
        switch(flagLoadFrequencia){
          case 'vazio':
            return(
              <View>
                  <Text style={styles.textLoad}>Adicione os alunos...</Text>
              </View>
            )
          case 'carregando':
            return(
              <View>
                  <Text style={styles.textLoad}>Carregando...</Text>
              </View>
            )   
          case 'carregado':
            return(
              <FlatList
                data={listaFrequencia}
                renderItem={renderItem}
                keyExtractor={item => item.numero}
                extraData={selectedId}
              />
            )
        }
      }else{
        return(
          <View>
              <Text style={styles.textLoad}>Selecione uma data...</Text>
          </View>
        )
      }
    }else{
      return(
        <View>
            <Text style={styles.textLoad}>Selecione uma Classe...</Text>
        </View>
      ) 
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        {renderCarregamento()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  containerItem:{
    flexDirection:'row',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: Globais.corTerciaria,
  },
  itemNota: {
    width:80,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: Globais.corTerciaria,
  },
  title: {
    fontSize: 24,
  },
  titleFrequencia:{
    fontSize: 24,
    textAlign: 'center',
  },
  nome:{
    flex:3
  },
  frequencia:{
    flex:1
  },
  textLoad:{
    fontSize:24,
    color:Globais.corTextoClaro,
  }
});

export default FlatListNotas;