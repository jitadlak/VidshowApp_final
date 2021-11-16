import React, {useState, useEffect, useLayoutEffect} from 'react';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import animated from 'react-native-reanimated'
// import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const [user, setUser] = useState(false)
  // const storeData = async (value) => {
  //     try {
  //     //   const jsonValue = JSON.stringify(value)
  //     //   await AsyncStorage.setItem('isLoggedIn', jsonValue)
  //     //   console.log(jsonValue)
  //       navigation.replace('Drawer')
  //     } catch (e) {
  //       // saving error
  //     }
  //   }


  const storeData = async () => {
    try {
      await AsyncStorage.setItem('user', 'true')
      console.log('async storage set')
    } catch (e) {
      console.log('async storage not set')
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if(value == "true") {
        navigation.replace('Drawer')
      }else{
        return
      }
    } catch(e) {
      // error reading value
    }
  }

  

  useEffect(()=>{
  getData()
  })

  const signin = async () => {
    if (!number) {
      return Snackbar.show({
        text: 'Please Enter Mobile No.',
        duration: Snackbar.LENGTH_SHORT,
      });
    } 
    // if(!number.length == 10){
    //     return Snackbar.show({
    //         text: 'Please Enter Valid Mobile No.',
    //         duration: Snackbar.LENGTH_SHORT,
    //       });
    // }
    else {
      console.log('pressed');
      Snackbar.show({
        text: 'OTP In Process !! Please Wait....',
        duration: Snackbar.LENGTH_SHORT,
      });
      const confirmation = await auth().signInWithPhoneNumber('+91' + number);
      console.log('confirmation', confirmation);
      if (confirmation) {
        setConfirm(confirmation);
        return Snackbar.show({
          text: 'OTP Sent SuccessFully !!',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    }
  };
  async function confirmCode() {
    try {
      await confirm.confirm(code);
      console.log('valid');
      console.log('code', code)
     storeData()
      //   alert('otp verified successfully');
      navigation.replace('Drawer');
    } catch (error) {
      console.log('Invalid code.');
      return Snackbar.show({
        text: 'Invalid OTP !!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={'position'}
      keyboardVerticalOffset={40}>
      <View style={{alignItems: 'center'}}>
      <LottieView source={require('../Images/logo.json')} autoPlay loop style={styles.Logo} />
        <Text style={styles.appheading}>VIDSHOW APP</Text>
      </View>
      <View style={styles.secondView}>
        <Text style={styles.heading}>Login Using Phone </Text>
        <TextInput
          placeholder="Enter You Mobile Number"
          style={styles.textInput}
          keyboardType="number-pad"
          onChangeText={number => setNumber(number)}
          placeholderTextColor="black"
        />
        <TouchableOpacity style={styles.btngetotp} onPress={() => signin()}>
          <Text style={styles.btnText}>GET OTP</Text>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TextInput
            placeholder="Enter OTP"
            style={styles.textInput2}
            value={code}
            keyboardType="number-pad"
            placeholderTextColor="black"
            onChangeText={text => setCode(text)}
          />
          <TouchableOpacity
            style={styles.btngetverify}
            onPress={() => confirmCode()}>
            <Text style={styles.btnText}>VERIFY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'black',
  },
  colorStyle: {
    color: 'white',
  },
  Logo: {
    height: 200,
    width: 200,
    marginTop: 30,
  },
  secondView: {
    height: '100%',
    borderWidth: 1,
    // borderColor:'white',
    backgroundColor: 'tomato',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  textInput: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 20,
    paddingLeft: 20,
  },
  textInput2: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 15,
    width:100,
    paddingLeft: 10,
  },
  heading: {
    color: 'black',
    alignSelf: 'center',
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  appheading: {
    color: 'white',
    alignSelf: 'center',
    margin: 15,
    marginTop:25,
    fontSize: 30,
    fontWeight: 'bold',
  },
  btngetotp: {
    height: 50,
    width: 100,
    backgroundColor: '#E8BD0D',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
  },
  btngetverify: {
    height: 50,
    width: 100,
    backgroundColor: '#12B0E8',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});
