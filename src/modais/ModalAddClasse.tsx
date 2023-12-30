import { Text, View, StyleSheet, Pressable, TextInput, Modal, NativeSyntheticEvent, TextInputChangeEventData, ToastAndroid, TouchableOpacity } from "react-native"
import React, { useState, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Context} from "../data/Provider";
import Globais from "../data/Globais";
import { Icon } from "../componentes/Icon";


const ModalAddClasse = () =>{

    const [valueClasse,setValueClasse] = useState<string>('')
    const {modalAddClasse,setModalAddClasse,idPeriodoSelec,
      setRecarregarClasses,idUsuario,setIdClasseSelec,idClasseSelec,
      nomePeriodoSelec,setNomeClasseSelec} = useContext(Context)

    const onChangeInputClasse = (event: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        setValueClasse(event.nativeEvent.text);
      }
    
    const onPressAddClasse = async () =>{
      if(valueClasse!=''){
        setNomeClasseSelec(valueClasse)
        const refDoc = firestore().collection(idUsuario).doc(idPeriodoSelec).collection('Classes');
        const idClasse = (await refDoc.add({})).id
        refDoc.doc(idClasse).set({
          classe:valueClasse,
          idClasse:idClasse
        })
        await setIdClasseSelec(idClasse);
        setRecarregarClasses('recarregar')
        setModalAddClasse(!modalAddClasse);

        //atualizando o estado da classe
        firestore().collection(idUsuario).
        doc('EstadosApp').set({
          idPeriodo:idPeriodoSelec,
          periodo:nomePeriodoSelec,
          idClasse:idClasse,
          classe:valueClasse,
          data:'',
          aba:'Classes'
        })
      }else{
        ToastAndroid.show(
          'Digite o nome da classe!',
          ToastAndroid.SHORT)
      }
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAddClasse}
                onRequestClose={() => {
                  setModalAddClasse(!modalAddClasse);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.containerIcon}>
                            <TouchableOpacity  onPress={()=>setModalAddClasse(!modalAddClasse)}>
                                <Icon name="cancel-circle" color="white" size={20}></Icon>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalText}>Crie uma nova classe:</Text>
                        <TextInput placeholder='Nome da classe' onChange={onChangeInputClasse} style={styles.textInput}></TextInput>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={()=>[onPressAddClasse(),setRecarregarClasses('recarregarClasses')]}>
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

export default ModalAddClasse