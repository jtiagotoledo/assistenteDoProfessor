import { Text, View, StyleSheet, Pressable, TextInput, Modal, NativeSyntheticEvent, TextInputChangeEventData, ToastAndroid, TouchableOpacity } from "react-native"
import React, { useState, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from "../data/Globais";
import { Icon } from "../componentes/Icon";


const ModalEditAluno = () =>{

    const [valueAluno,setValueAluno] = useState<string>('')
    const {modalEditAluno,setModalEditAluno,idPeriodoSelec,
      setRecarregarAlunos,idUsuario,idClasseSelec,numAlunoSelec,
      nomeAlunoSelec,alunoInativo,setAlunoInativo,
      setFlagLongPressAluno} = useContext(Context)

    const onChangeInputAluno = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
      setValueAluno(event.nativeEvent.text);
      }
    
    const onPressEditAluno = async () =>{
      if(valueAluno!=''){
        firestore().collection(idUsuario)
        .doc(idPeriodoSelec).collection('Classes')
        .doc(idClasseSelec).collection('ListaAlunos')
        .doc(numAlunoSelec).update({
          nome:valueAluno,
          inativo:alunoInativo
        })
        setRecarregarAlunos('recarregar')
        setAlunoInativo(false)
        setModalEditAluno(!modalEditAluno);
      }else{
        ToastAndroid.show(
          'O campo nome do aluno é obrigatório!',
          ToastAndroid.SHORT)
      }
    }

    const renderIconCheck = () =>{
      return(
        alunoInativo?<Icon name="checkmark" color="white" size={20}/>:
                       <Icon name="checkmark2" color="white" size={20}/>
      )
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEditAluno}
                onRequestClose={() => {
                  setModalEditAluno(!modalEditAluno);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.containerIcon}>
                            <TouchableOpacity  onPress={()=>[setModalEditAluno(!modalEditAluno),setAlunoInativo(false),setFlagLongPressAluno(false)]}>
                                <Icon name="cancel-circle" color="white" size={20}></Icon>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalText}>Edite o nome do aluno:</Text>
                        <TextInput 
                          style={styles.textInput}
                          placeholder='Nome do aluno'
                          defaultValue={nomeAlunoSelec} 
                          onChange={onChangeInputAluno}>
                        </TextInput>
                        <TouchableOpacity style={styles.iconCheckContainer} onPress={()=>setAlunoInativo(!alunoInativo)}>
                          {renderIconCheck()}
                          <Text style={[styles.textStyle,styles.textCheck]}>Aluno inativo?</Text>
                        </TouchableOpacity>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={()=>[onPressEditAluno(),setRecarregarAlunos('recarregarAlunos'),setFlagLongPressAluno(false)]}>
                            <Text style={styles.textStyle}>Editar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:16,
      marginBottom:16,
      marginRight:16
    },
    containerIcon:{
      alignItems:'flex-end'
    },
    iconCheckContainer:{
      flexDirection:'row',
      marginBottom:16
    },
    textCheck:{
      marginLeft:16
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: Globais.corTerciaria,
      borderRadius: 20,
      padding: 35,
      // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'white',
      fontSize:18,
    },
    textInput:{
      backgroundColor: 'white', 
      minWidth:100, 
      marginBottom:20
    }

  });

export default ModalEditAluno;