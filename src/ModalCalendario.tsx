import { View, StyleSheet, Modal } from "react-native"
import React, { useContext } from 'react';
import {Context} from "./data/Provider";
import Globais from "./Globais";
import Calendario from "./Calendario";

const ModalCalendario = () =>{

    const {modalCalendario,setModalCalendario} = useContext(Context)

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCalendario}
                onRequestClose={() => {
                setModalCalendario(!modalCalendario);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Calendario></Calendario>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: Globais.corTerciaria,
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
    }
  });

export default ModalCalendario