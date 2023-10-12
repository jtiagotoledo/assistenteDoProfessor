import { Text, View, StyleSheet, Pressable, Modal, TouchableOpacity} from "react-native"
import React, { useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Context} from "./data/Provider";
import { Icon } from "./Icon";
import Globais from "./Globais";

const ModalDelClasse = () =>{

    const {periodoSelec, classeSelec, modalDelClasse, setModalDelClasse} = useContext(Context);

    const deletarClasse = ()=> {
      firestore().collection('Usuario')
      .doc(periodoSelec).collection('Classes')
      .doc(classeSelec).delete()
      setModalDelClasse(!modalDelClasse)
    }
    
    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDelClasse}
                onRequestClose={() => {
                setModalDelClasse(!modalDelClasse);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.containerIcon}>
                            <TouchableOpacity  onPress={()=>setModalDelClasse(!modalDelClasse)}>
                                <Icon name="cancel-circle" color="black" size={20}></Icon>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.modalText}>Deseja realmente excluir a classe?</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={deletarClasse}>
                            <Text style={styles.textStyle}>Ok</Text>
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
      alignItems:'flex-end',
      marginBottom:24,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
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
      marginBottom: 24,
      textAlign: 'center',
      fontSize:18,
    },
  });

export default ModalDelClasse;