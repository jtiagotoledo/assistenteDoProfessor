import { View, StyleSheet, Text} from "react-native"
import { Divider } from "react-native-paper";

import Fab from "./Fab";
import DropDown from "./DropDown";
import FlatListAlunos from "./FlatListAlunos";
import FlatListClasses from "./FlatListClasses";
import HeaderClasses from "./HeaderClasses";
import Globais from "./Globais";

import ModalAddPeriodo from "./ModalAddPeriodo";
import ModalAddClasse from "./ModalAddClasse";
import ModalAddAluno from "./ModalAddAluno";
import ModalDelAluno from "./ModalDelAluno";
import ModalDelClasse from "./ModalDelClasse";

function Classes() {
    
  return (
    <View style={styles.container}>
      <HeaderClasses title="Classes"></HeaderClasses>
      <DropDown ></DropDown>
      <Text style={styles.text}>Selecione uma classe:</Text>
      <FlatListClasses></FlatListClasses>
      <Divider style={styles.divider}></Divider>
      <FlatListAlunos></FlatListAlunos>
      <ModalAddPeriodo></ModalAddPeriodo>
      <ModalAddClasse></ModalAddClasse>
      <ModalAddAluno></ModalAddAluno>
      <ModalDelAluno></ModalDelAluno>
      <ModalDelClasse></ModalDelClasse>
      <Fab></Fab>
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
  }
});

export default Classes;