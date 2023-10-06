import React, { useContext, useEffect, useState } from 'react'
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, View} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {Context} from "./data/Provider";
import Globais from './Globais';

type ItemData = {
  classe: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.classe}</Text>
  </TouchableOpacity>
);

const FlatListClasses = () => {
    let classes:any []= []
    const [selectedId, setSelectedId] = useState<string>();
    const {periodoSelec,classeSelec,setClasseSelec} = useContext(Context)
    const {flagLoadClasses,setflagLoadAlunos,setflagLoadClasses,listaClasses,setListaClasses} = useContext(Context)

  useEffect(()=>{
    const data = async ()=>{
      setflagLoadClasses('carregando')
      await firestore().collection('Usuario')
      .doc(periodoSelec).collection('Classes')
      .get().then(querySnapshot => {
      if(querySnapshot.empty){
        setflagLoadClasses('vazio')
      }else{
        querySnapshot.forEach((documentSnapshot,index) => {
        classes.push(documentSnapshot.data());
          if(querySnapshot.size-index==1){
            setflagLoadClasses('carregado')
            console.log('entrou no if da flag classes')
          } 
        });
      }
    });
    setListaClasses(classes)
}
data()        
},[periodoSelec]);

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.classe === selectedId ? Globais.corPrimaria : Globais.corTerciaria;
    const color = item.classe === selectedId ? Globais.corTextoClaro : Globais.corTextoEscuro;

    return (
      <Item
        item={item}
        onPress={() => [setSelectedId(item.classe),
          setClasseSelec(item.classe), 
          setflagLoadAlunos(false),
          console.log(classeSelec)]}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderCarregamento = () =>{
    if(periodoSelec!=''){
      switch(flagLoadClasses){
        case 'vazio':
          return(
            <View>
                <Text style={styles.textLoad}>Adicione uma classe...</Text>
            </View>
          )
        case 'carregado':
          return(
            <SafeAreaView >
              <FlatList
                horizontal = {true}
                data={listaClasses}
                renderItem={renderItem}
                keyExtractor={item => item.classe}
                extraData={selectedId}
              />
            </SafeAreaView>
          )
        case 'carregando':
          return(
            <View>
                <Text style={styles.textLoad}>Carregando...</Text>
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
  
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius:40
  },
  title: {
    fontSize: 20,

  },
  textLoad:{
    fontSize:24,
    color:Globais.corTextoClaro,
  }
});

export default FlatListClasses;