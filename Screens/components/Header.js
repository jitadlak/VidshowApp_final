import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const myIcon = <Icon name="sign-out" size={30} color="#fff" />;
const Header = () => {
    // console.log(props.navigation.navigate)
    // useEffect(()=>{
    //     getData()
    //   },[])
    //   const getData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('isLoggedIn')
    //       if(value == false) {
    //         navigation.navigate('Login')
    //       }
    //     } catch(e) {
    //       // error reading value
    //     }
    //   }
    //   const storeData = async (value) => {
    //     try {
    //       const jsonValue = JSON.stringify(value)
    //       await AsyncStorage.setItem('isLoggedIn', jsonValue)
    //       console.log(jsonValue)
    //       props.navigation.replace('Login')
    //     } catch (e) {
    //       // saving error
    //     }
    //   }
    
    return (
        <View style={{backgroundColor:'black',}}>
        <View style={styles.headmain}>
            <Image
        style={styles.Logo}
        source={require('../../Images/Logo.png')}
      />
      <Text style={styles.appheading}>VIDSHOW APP</Text>
      <TouchableOpacity style={{alignSelf:'center', marginTop:13, marginLeft:70}}
      
      >
     {myIcon}
      </TouchableOpacity>
      
     
      </View>
      <Text style={styles.appsubheading}>For Entertainments</Text>
     
        </View>
    )
}

export default Header
const styles= StyleSheet.create({
    headmain:{
        height:40,  
        
      display:'flex',
      flexDirection:'row'

    },
    Logo:{
        height:40,
        width:40,
        marginLeft:30,
        marginTop:10,
        
       
        
    },
    appheading:{
        color:'white',
       marginLeft:30,
       marginTop:5,
       alignSelf:'center',
        fontSize:20,
        fontWeight:'bold'
    },
    appsubheading:{
        color:'tomato',
       marginBottom:5,
       marginLeft:-25,
       alignSelf:'center',
        fontSize:15,
        fontWeight:'bold'
    },
})
