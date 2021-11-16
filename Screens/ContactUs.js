import React, {useState} from 'react';
import {View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';


import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {Picker} from '@react-native-picker/picker';

const ContactUs = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Description, setDescription] = useState("");





  const UploadData = async () => {

    if (!Name || !Email ||  !Description) {
      return Snackbar.show({
        text: 'Please Enter All Details',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    const id = uuid.v4();
    firestore()
      .collection('Contact Queries')
      .add({
        id: id,
        Name: Name,
        Email: Email,
        Description: Description,
        
      })
      .then(() => {
        console.log('Query Added !');
        alert("Your Query Has Been Recorded !!")
        setName(null);
        setEmail(null);
        setDescription(null);
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Text
        style={{
          color: 'tomato',
          alignSelf: 'center',
          fontSize: 25,
          fontWeight: 'bold',
          margin:50
        }}>
       Contact Us 
      </Text>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        
      
        
        <View style={{width: '100%'}}>
          <TextInput
            placeholder="Name"
            style={styles.textinput}
            placeholderTextColor="#fff"
            onChangeText={name => setName(name)}
            value={Name}
          />
          <TextInput
            placeholder="Email"
            style={styles.textinput}
            placeholderTextColor="#fff"
            onChangeText={email => setEmail(email)}
            value={Email}
          />
          
         
          <TextInput
            placeholder="Description"
            multiline={true}
            style={[styles.textinput, {height: 100}]}
            placeholderTextColor="#fff"
            onChangeText={desc => setDescription(desc)}
            value={Description}
          />
        </View>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: 'teal', width: 200}]}
          onPress={()=>UploadData()}
         >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Add Record
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactUs;
const styles = StyleSheet.create({
  textinput: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    height: 40,
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    paddingLeft: 20,
    borderRadius: 8,
  },
  btn: {
    height: 30,
    width: 150,
    backgroundColor: 'tomato',
    margin: 20,
    borderRadius: 5,
  },
});
