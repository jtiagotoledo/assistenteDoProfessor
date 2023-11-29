import { FloatingAction } from "react-native-floating-action";
import React, { useContext } from 'react';
import { View, ToastAndroid } from "react-native";
import {Icon} from './Icon'
import {Context} from "../data/Provider";
import Globais from "../data/Globais";

const actions = [
    {
      text: "Adicionar período",
      textBackground: Globais.corPrimaria,
      textColor: Globais.corTextoClaro,
      color: Globais.corPrimaria,
      icon: <Icon name={'calendar'} color={'white'}></Icon>,
      name: "periodo",
      position: 1
    },
    {
      text: "Adicionar classe",
      textBackground: Globais.corPrimaria,
      textColor: Globais.corTextoClaro,
      color: Globais.corPrimaria,
      icon: <Icon name={'book'} color={'white'}></Icon>,
      name: "classe",
      position: 2,
    },
    {
      text: "Adicionar aluno",
      textBackground: Globais.corPrimaria,
      textColor: Globais.corTextoClaro,
      color: Globais.corPrimaria,
      icon: <Icon name={'user'} color={'white'}></Icon>,
      name: "aluno",
      position: 3
    },
    
  ];

const FabClasses = ()=>{

    const {setModalPeriodo, setModalClasse,
      setModalAluno, periodoSelec, classeSelec} = useContext(Context);

    return(
        <View>
            <FloatingAction
            color={Globais.corPrimaria}
            actions={actions}
            floatingIcon={<Icon name={'plus'} color={'white'}></Icon>}
            onPressItem={name => {
                name=='periodo'?setModalPeriodo(true):null
                if(periodoSelec!=''){
                  name=='classe'?setModalClasse(true):null
                }else if(periodoSelec!=''||name=='classe'){
                  ToastAndroid.show(
                    'Selecione um período primeiro!',
                    ToastAndroid.SHORT)
                }
                if(classeSelec!=''){
                  name=='aluno'?setModalAluno(true):null
                }else if(classeSelec!=''||name=='aluno'){
                    ToastAndroid.show(
                      'Selecione uma classe primeiro!',
                      ToastAndroid.SHORT)
                }
            }}/>
        </View>
    )
}

export default FabClasses;