import React from 'react'
import { View, Text , Image} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  import auth from '@react-native-firebase/auth';
  import LottieView from 'lottie-react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
const CustomDrawerContent = (props) => {
    const logout=()=>{
        props.navigation.closeDrawer();
        auth()
       .signOut()
     .then(() => console.log('User signed out!'));
        props.navigation.replace('Login')
        storeData()
    }
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('user', 'false')
        console.log('async storage set')
      } catch (e) {
        console.log('async storage not set')
      }
    }
    return (
        <View style={{flex:1, backgroundColor:'#EDBF69'}}>
        <DrawerContentScrollView {...props}
        
          >
            <View style={{backgroundColor:'tomato', height:150, alignItems:'center', justifyContent:'center',
        display:'flex'
        }}>

<LottieView source={require('../../Images/logo.json')} autoPlay loop style={{width:150, height:130}} />
       
        <Text style={{
            color:'white', 
            fontWeight:'bold',
            fontSize:15,
            margin:5,
            marginBottom:15,
            alignSelf:'center'

        }}>VIDSHOW APP</Text>
            </View>
            <View style={{backgroundColor:'#EDBF69'}}>
      <DrawerItemList {...props} />
    
      
     
      <DrawerItem label="Log Out" labelStyle={{fontSize:18, fontWeight:'bold', color:'black'}} onPress={() => logout() } />
     
      <DrawerItem label="Help" labelStyle={{fontSize:18, fontWeight:'bold', color:'black'}}
        onPress={() => alert("Please feel free to connect on VidShowApp@gmail.com, Or Write a Query on Contact Us.")} />
      </View>
    </DrawerContentScrollView></View>
    )
}

export default CustomDrawerContent
