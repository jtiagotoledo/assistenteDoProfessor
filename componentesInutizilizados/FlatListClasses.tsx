import React, { useContext, useEffect, useState } from 'react'
import {View, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "../src/data/Provider";
import Globais from '../src/data/Globais';

const FlatListClasses = () => {
  const alunos:any[] = []
  const [listaAlunos,setListaALunos]=useState([{numero:'',nome:''}]);
  const {idPeriodoSelec,idClasseSelec,setNumAlunoSelec} = useContext(Context)


  useEffect(()=>{
    const data = async ()=>{
    await firestore().collection('Usuario')
    .doc(idPeriodoSelec).collection('Classes')
    .doc(idClasseSelec).collection('ListaAlunos')
    .orderBy('numero')
    .get().then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
    alunos.push(documentSnapshot.data());
    });
    });
    setListaALunos(alunos)
}
data()        
},[idPeriodoSelec,listaAlunos]);

type ItemProps = {nome: string, numero:string};

const Item = ({nome,numero}: ItemProps) => (
    <View style={styles.item}>
      <TouchableOpacity
      onLongPress={()=>setNumAlunoSelec(numero)}>
        <Text 
        style={styles.title}>
          {numero} {nome}
        </Text>
      </TouchableOpacity>
    </View>
);

    return(
        <View style={styles.container}>
            <FlatList
            data={listaAlunos}
            renderItem={({item}) => 
            <Item nome={item.nome} numero={item.numero}/>}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow:1,
      flex:1,
    },
    item: {
      backgroundColor: Globais.corTerciaria,
      padding: 10,
      marginVertical: 4,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 24,
      color: Globais.corTextoEscuro,
      flex:1,
    },
  });

export default FlatListClasses;  