import { View, Button, StyleSheet } from 'react-native';
import { Chip } from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';

const CustomChips = ()=>{
    //const numbers = [1, 2, 3, 4, 5];
    let chipsClasses:any='';
    const  listaClasses: any[]=[];

    const [value,setValue] = useState('')

    useEffect(()=>{
        const data = async ()=>{
        await firestore().collection('Users').get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
        listaClasses.push(documentSnapshot.id);
        chipsClasses = listaClasses.map((classe:any) =>
        <Chip key={classe} title={classe} ></Chip>);
        });
        
        setValue(chipsClasses)
        console.log('chipsClasses',chipsClasses);    
        console.log('listaClasses',listaClasses);    
        });
    }
    data()        
    })
  
    
    
    const alterarLista = () =>{
        setValue(chipsClasses)
    }

    
    return(
        <View style={styles.contentView}>
            <View style={{alignItems:'center', marginTop:25}}  >{value}</View>
            <Button onPress={alterarLista} title='alterarLista'/>
        </View>
        
    );
}

const styles = StyleSheet.create({
    contentView: {
      marginTop: 20,
    },
    });


export default CustomChips;