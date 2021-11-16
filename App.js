import 'react-native-gesture-handler';
import React from 'react';

import {StyleSheet, Text, View, Image} from 'react-native';
import Login from './Screens/Login';
import Home from './Screens/Home';
import Allcontent from './Screens/Allcontent';
import Admin from './Screens/Admin';
import SpecialMovies from './Screens/SpecialMovies';
import CustomDrawerContent from './Screens/components/CustomDrawerContent';
import ContactUs from './Screens/ContactUs';

import { createDrawerNavigator } from '@react-navigation/drawer';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Player from './Screens/Player';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

import AsyncStorage from '@react-native-async-storage/async-storage';
import TopMovies from './Screens/Top Movies';
import Passcode from './Screens/Passcode';

// const TabNav=()=>{
//   <Tab.Navigator>
//   <Tab.Screen name="Home" component={Home} />
//   <Tab.Screen name="Login" component={Login} />
// </Tab.Navigator>
// }

function sideDrawer() {
  return (
    <Drawer.Navigator 
   
    screenOptions={{
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      drawerActiveBackgroundColor:'#E5D68A',
      drawerActiveTintColor:'tomato'
      ,
      headerTitle: (props) => ( // App Logo
        <View style={{display:'flex', flexDirection:'row', alignContent:'center',justifyContent:'center'}}> 
          <Image
          style={{ width: 50, height: 40 }}
          source={require('./Images/Logo.png')}
          resizeMode='contain'
        />
        <Text style={{color:'white', fontSize:18, fontWeight:'bold', margin:10}}>VIDSHOW APP</Text>
        </View>
        
      ),
      headerShown:true,
      
      
      
    }} 
    
     drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} options={{drawerLabelStyle:{fontSize:18, fontWeight:'bold', color:'black'}}}/>
      <Drawer.Screen name="AllContent" component={Allcontent} options={{drawerLabelStyle:{fontSize:18, fontWeight:'bold', color:'black'}, }}/>
      <Drawer.Screen name="Special Movies" component={SpecialMovies} options={{drawerLabelStyle:{fontSize:18, fontWeight:'bold', color:'black'}, }}/>
      <Drawer.Screen name="Trending Movies" component={TopMovies} options={{drawerLabelStyle:{fontSize:18, fontWeight:'bold', color:'black'}, }}/>
      <Drawer.Screen name="Admin" component={Passcode} options={{drawerLabelStyle:{fontSize:18, fontWeight:'bold', color:'black'}, }}/>
      <Drawer.Screen name="Contact Us" component={ContactUs} options={{drawerLabelStyle:{fontSize:18, fontWeight:'bold', color:'black'}, }}/>
     
      
    </Drawer.Navigator>
  );
}

const isLoggedIn = false;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:true,headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitle: (props) => ( // App Logo
        <View style={{display:'flex', flexDirection:'row', alignContent:'center',justifyContent:'center'}}> 
          <Image
          style={{ width: 50, height: 40 }}
          source={require('./Images/Logo.png')}
          resizeMode='contain'
        />
        <Text style={{color:'white', fontSize:18, fontWeight:'bold', margin:10}}>VIDSHOW APP</Text>
        </View>
        
      ),}}>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Drawer" component={sideDrawer} options={{headerShown:false}} />
      <Stack.Screen name="Adminpage" component={Admin} options={{headerShown:false}} />
      
      
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Player" component={Player} />
        

       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
