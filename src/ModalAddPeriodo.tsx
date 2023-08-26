import { Text, View, StyleSheet, Pressable, TextInput, Modal, NativeSyntheticEvent, TextInputChangeEventData } from "react-native"
import React, { useState, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Context} from "./data/Provider";

const ModalAddPeriodo = () =>{

    let [valuePeriodo,setValuePeriodo] = useState<string>('')
    const {modalPeriodo,setmodalPeriodo} = useContext(Context)

    const onChangeInputPeriodo = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        setValuePeriodo(event.nativeEvent.text);
      }
    
    const onPressAddPeriodo = () =>{
    firestore()
    .collection('Usuario')
    .doc(valuePeriodo)
    .set({
    })
    setmodalPeriodo(!modalPeriodo);
    console.log('função adicionar período',valuePeriodo);
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalPeriodo}
                onRequestClose={() => {
                setmodalPeriodo(!modalPeriodo);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Crie um novo período:</Text>
                        <TextInput onChange={onChangeInputPeriodo} style={{backgroundColor:'#d3d3d3', minWidth:100, marginBottom:20}}></TextInput>
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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
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
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

export default ModalAddPeriodo