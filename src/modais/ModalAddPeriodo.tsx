import { Text, View, StyleSheet, Pressable, TextInput, Modal, NativeSyntheticEvent, TextInputChangeEventData, ToastAndroid, TouchableOpacity } from "react-native"
import React, { useState, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from "../data/Globais";
import { Icon } from "../componentes/Icon";

const ModalAddPeriodo = () =>{

    const [valuePeriodo,setValuePeriodo] = useState<string>('')
    const {modalPeriodo,setModalPeriodo,idUsuario} = useContext(Context)

    const onChangeInputPeriodo = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        setValuePeriodo(event.nativeEvent.text);
      }
    
    const onPressAddPeriodo = () =>{
      if(valuePeriodo!=''){
        firestore()
        .collection(idUsuario||'')
        .doc(valuePeriodo)
        .set({
        })
        setModalPeriodo(!modalPeriodo);
        console.log('função adicionar período',valuePeriodo);
      }
      else{
        ToastAndroid.show(
          'Digite o nome do período!',
          ToastAndroid.SHORT)
      }
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalPeriodo}
                onRequestClose={() => {
                setModalPeriodo(!modalPeriodo);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.containerIcon}>
                            <TouchableOpacity  onPress={()=>setModalPeriodo(!modalPeriodo)}>
                                <Icon name="cancel-circle" color="white" size={20}></Icon>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalText}>Crie um novo período:</Text>
                        <TextInput placeholder='Nome do período' onChange={onChangeInputPeriodo} style={styles.textInput}></TextInput>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={onPressAddPeriodo}>
                            <Text style={styles.textStyle}>Criar</Text>
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

export default ModalAddPeriodo