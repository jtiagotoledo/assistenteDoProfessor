import { View, StyleSheet, Text} from "react-native"
import React, { useContext} from 'react';
import { Context } from "./data/Provider";

import Fab from "./Fab";
import DropDown from "./DropDown";
import FlatListClasses from "./FlatListClasses";
import CustomChips from "./CustomChips";

import ModalAddPeriodo from "./ModalAddPeriodo";
import ModalAddClasse from "./ModalAddClasse";
import ModalAddAluno from "./ModalAddAluno";
import ModalDelAluno from "./ModalDelAluno";

import BtnDelAluno from "./BtnDelAluno";

function Classes() {
    
  const {classeSelec, numAlunoSelec} = useContext(Context)

  return (
    <View style={styles.container}>
      <View style={styles.contDropBtnAddPer}>
        <DropDown ></DropDown>
      </View>
      <View>
        <Text style={styles.text}>Selecione uma classe:</Text>
        <View style={styles.contChipsBtnAddClasse}>
          <CustomChips></CustomChips>
        </View>
      </View>
      <BtnDelAluno></BtnDelAluno>
      <Text style={styles.text}>Classe selecionada: {classeSelec}</Text>
      <Text style={styles.text}>Aluno selecionado: {numAlunoSelec}</Text>
      <FlatListClasses></FlatListClasses>
      <ModalAddPeriodo></ModalAddPeriodo>
      <ModalAddClasse></ModalAddClasse>
      <ModalAddAluno></ModalAddAluno>
      <ModalDelAluno></ModalDelAluno>
      <Fab></Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1
  },
  contDropBtnAddPer:{
    flexDirection:'row',
  },
  contChipsBtnAddClasse:{
    flexDirection:'row',
  },
  text:{
    fontSize:24,
    alignContent:'center',
    justifyContent:'center',
    
  }
  
});

export default Classes;