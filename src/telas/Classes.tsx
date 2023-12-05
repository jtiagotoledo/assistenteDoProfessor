import { View, StyleSheet, Text, Button} from "react-native"
import { Divider } from "react-native-paper";
import auth from '@react-native-firebase/auth';

import FabClasses from "../componentes/FabClasses";
import FlatListAlunos from "../listas/FlatListAlunos";
import FlatListClasses from "../listas/FlatListClasses";
import HeaderClasses from "../componentes/HeaderClasses";
import Globais from "../data/Globais";

import { useContext } from "react";
import ModalAddPeriodo from "../modais/ModalAddPeriodo";
import ModalAddClasse from "../modais/ModalAddClasse";
import ModalAddAluno from "../modais/ModalAddAluno";
import ModalDelAluno from "../modais/ModalDelAluno";
import ModalDelClasse from "../modais/ModalDelClasse";
import ModalMenu from "../modais/ModalMenu";
import {Context} from "../data/Provider";


function Classes({navigation}:any) {

  const {periodoSelec} = useContext(Context)
    
  return (
    <View style={styles.container}>
      <HeaderClasses title="Classes"></HeaderClasses>
      <Text style={styles.textLoad}>{periodoSelec!=''?'Período: '+periodoSelec:'Selecione um período'}</Text>
      <Divider style={styles.divider}></Divider>
      <FlatListClasses></FlatListClasses>
      <Divider style={styles.divider}></Divider>
      <FlatListAlunos></FlatListAlunos>
      <ModalAddPeriodo></ModalAddPeriodo>
      <ModalAddClasse></ModalAddClasse>
      <ModalAddAluno></ModalAddAluno>
      <ModalDelAluno></ModalDelAluno>
      <ModalDelClasse></ModalDelClasse>
      <ModalMenu navigation={navigation}></ModalMenu>
      <FabClasses></FabClasses>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: Globais.corSecundaria,
    flex:1,
  },
  
  text:{
    fontSize:20,
    padding:5,
    color: Globais.corTextoEscuro,
  },
  divider:{
    backgroundColor: Globais.corPrimaria,
  },
  textLoad:{
    fontSize:24,
    color:Globais.corTextoClaro,
  }
});

export default Classes;