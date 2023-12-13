import { Text, View, StyleSheet, Pressable, TextInput, Modal, NativeSyntheticEvent, TextInputChangeEventData, ToastAndroid, TouchableOpacity } from "react-native"
import React, { useState, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from "../data/Globais";
import { Icon } from "../componentes/Icon";


const ModalEditPeriodo = () =>{

    const [valuePeriodo,setValuePeriodo] = useState<string>('')
    const {modalEditPeriodo,setModalEditPeriodo,idPeriodoSelec,
      setRecarregarPeriodo,idUsuario,setIdClasseSelec,nomePeriodoSelec} = useContext(Context)

    const onChangeInputPeriodo = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        setValuePeriodo(event.nativeEvent.text);
      }
    
    const onPressEditPeriodo = async () =>{
      if(valuePeriodo!=''){
        firestore().collection(idUsuario)
        .doc(idPeriodoSelec).update({
          periodo:valuePeriodo
        })
        setRecarregarPeriodo('recarregar')
        setIdClasseSelec(valuePeriodo);
        setModalEditPeriodo(!modalEditPeriodo);
      }else{
        ToastAndroid.show(
          'O campo nome do período é obrigatório!',
          ToastAndroid.SHORT)
      }

      //atualizando o estado da classe
      firestore().collection(idUsuario).
      doc('Dados').collection('Estados').
      doc('EstadosApp').update({
        periodo:valuePeriodo
      })
      
      
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEditPeriodo}
                onRequestClose={() => {
                  setModalEditPeriodo(!modalEditPeriodo);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.containerIcon}>
                            <TouchableOpacity  onPress={()=>setModalEditPeriodo(!modalEditPeriodo)}>
                                <Icon name="cancel-circle" color="white" size={20}></Icon>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalText}>Edite o nome do período:</Text>
                        <TextInput 
                          style={styles.textInput}
                          placeholder='Nome do período'
                          defaultValue={nomePeriodoSelec} 
                          onChange={onChangeInputPeriodo}>
                        </TextInput>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={()=>[onPressEditPeriodo(),setRecarregarPeriodo('recarregarPeriodos')]}>
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

export default ModalEditPeriodo;