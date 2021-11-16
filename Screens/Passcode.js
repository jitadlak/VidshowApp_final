import React, {useState} from 'react';
import {View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Snackbar from 'react-native-snackbar';

const Passcode = ({navigation}) => {
const [passcode, setPasscode] = useState()
console.log(passcode)
  const checkPasscode=()=>{
      if(passcode=== '26111998'){
          navigation.navigate('Adminpage')
          setPasscode('')
      }else{
        return Snackbar.show({
            text: 'Invalid.',
            duration: Snackbar.LENGTH_SHORT,
          });
      }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Text
        style={{
          color: 'tomato',
          alignSelf: 'center',
          fontSize: 25,
          fontWeight: 'bold',
          marginTop:50
        }}>
        Enter Admin Passcode
      </Text>
     <View style={{alignItems:'center', justifyContent:'center', flex:0.6}}>
     <SmoothPinCodeInput password mask="﹡"
  cellSize={36}
  codeLength={8}
  value={passcode}
  onTextChange={(e)=> setPasscode(e)}
  textStyle={{
    fontSize: 25,
    color: 'salmon'
  }}
  cellStyle={{
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white',
    
  }}
   cellStyleFocused={{
    borderColor: 'tomato',
    backgroundColor: 'black',
  }}
  textStyleFocused={{
    color: 'tomato'
  }}
  />
     </View>
<TouchableOpacity style={{height:30, width:200, backgroundColor:'tomato', alignSelf:'center', alignItems:'center', justifyContent:'center', borderRadius:5}}
onPress={()=>checkPasscode()}
>
<Text style={{fontSize:25, fontWeight:'bold', color:'black'}}>SUBMIT</Text>
</TouchableOpacity>
    </View>
  );
};

export default Passcode;
const styles = StyleSheet.create({
  
});
