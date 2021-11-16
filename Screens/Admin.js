import React, {useState} from 'react';
import {View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {Picker} from '@react-native-picker/picker';

const Admin = () => {
  const [Img, setImg] = useState(null);
  const [Vid, setVid] = useState(null);
  const [Percentage, setPercentage] = useState(0);
  const [bannerPercent, setBannerPercent] = useState(0)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
const [banner, setBanner]=  useState('')
  const [selectedType, setSelectedType] = useState();

  const UploadImg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async image => {
      console.log(image);

      let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
      //   console.log(imgName);

      let ext = imgName.split('.').pop();
      let name = imgName.split('.')[0];
      console.log(ext, name);

      let newname = name + Date.now() + '.' + ext;

      const reference = storage().ref('images/' + newname);

      try {
        const task = reference.putFile(image.path);
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
          setPercentage(
            Math.round(
              (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
            ),
          );
        });

        task.then(async () => {
          const url = await storage()
            .ref('images/' + newname)
            .getDownloadURL();
          console.log(url);
          setImg(url);

          alert('Image uploaded to the bucket!');
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const UploadVid = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async image => {
      console.log(image);

      let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
      //   console.log(imgName);

      let ext = imgName.split('.').pop();
      let name = imgName.split('.')[0];
      console.log(ext, name);

      let newname = name + Date.now() + '.' + ext;

      const reference = storage().ref('videos/' + newname);

      try {
        const task = reference.putFile(image.path);
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
          setPercentage(
            Math.round(
              (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
            ),
          );
        });

        task.then(async () => {
          const url = await storage()
            .ref('videos/' + newname)
            .getDownloadURL();
          console.log(url);
          setVid(url);

          alert('Video uploaded to the bucket!');
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const UploadData = async () => {
    console.log(title);
    console.log(category);
    console.log(year);
    console.log(description);
    console.log(selectedType);
    if (!title || !category || !year || !description || !selectedType || !Img || !Vid) {
      return Snackbar.show({
        text: 'Please Enter All Details',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    const id = uuid.v4();
    firestore()
      .collection('MoviesData')
      .add({
        id: id,
        title: title,
        category: category,
        year: year,
        description: description,
        type: selectedType,
        image: Img,
        video: Vid,
      })
      .then(() => {
        console.log('Post Added !');
        alert("Data Successfully Uploaded to Server !!")
        setImg(null);
        setVid(null);
        setTitle(null);
        setCategory(null);
        setYear(null);
        setDescription(null);
        setType(null);
      })
      .catch(error => {
        console.log(error);
      });
  };


  const UploadBanner = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async image => {
      console.log(image);

      let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
      //   console.log(imgName);

      let ext = imgName.split('.').pop();
      let name = imgName.split('.')[0];
      console.log(ext, name);

      let newname = name + Date.now() + '.' + ext;

      const reference = storage().ref('Banner/' + newname);

      try {
        const task = reference.putFile(image.path);
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
          setBannerPercent(
            Math.round(
              (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
            ),
          );
        });

        task.then(async () => {
          const url = await storage()
            .ref('Banner/' + newname)
            .getDownloadURL();
          console.log(url);
          setBanner(url);

          alert('Banner Image uploaded to the bucket!');
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const UploadBannerToDatabase = async () => {
   
    if (!banner) {
      return Snackbar.show({
        text: 'Please Select Banner Image',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    const id = uuid.v4();
    firestore()
      .collection('BannerImage')
      .add({
        id: id,
        banner: banner
      })
      .then(() => {
        console.log(' Added !');
        alert("Banner Image Successfully Uploaded to Server !!")
        setBanner(null);
        
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'black'}}>
      <Text
        style={{
          color: 'tomato',
          alignSelf: 'center',
          fontSize: 25,
          fontWeight: 'bold',
        }}>
        Admin Panel
      </Text>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => UploadImg()} style={styles.btn}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Upload Image
          </Text>
        </TouchableOpacity>
        {Percentage != 0 ? (
          <Text style={{alignSelf: 'center', color: 'white'}}>
            {Percentage} % Uploaded
          </Text>
        ) : null}
        <TouchableOpacity onPress={() => UploadVid()} style={styles.btn}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Upload Video
          </Text>
        </TouchableOpacity>
        
        <View style={{width: '100%'}}>
          <TextInput
            placeholder="Title"
            style={styles.textinput}
            placeholderTextColor="#fff"
            onChangeText={title => setTitle(title)}
            value={title}
          />
          <TextInput
            placeholder="Category, Like- Action/Comedy"
            style={styles.textinput}
            placeholderTextColor="#fff"
            onChangeText={category => setCategory(category)}
            value={category}
          />
          <TextInput
            placeholder="Year of Release"
            style={styles.textinput}
            placeholderTextColor="#fff"
            keyboardType="number-pad"
            onChangeText={year => setYear(year)}
            value={year}
          />
          <View style={{borderWidth:2, borderColor:'#fff', margin:20, borderRadius:10}}>
            
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedType(itemValue)
            }
           
            style={{borderWidth: 2, borderColor: 'white'}}>
            <Picker.Item label="Please Select Type" value="null" style={{color:'tomato'}} />
            <Picker.Item label="Special" value="special" style={{color:'tomato'}} />
            <Picker.Item label="Trending" value="trending" style={{color:'tomato'}} />
          </Picker></View>
          <TextInput
            placeholder="Description"
            multiline={true}
            style={[styles.textinput, {height: 100}]}
            placeholderTextColor="#fff"
            onChangeText={desc => setDescription(desc)}
            value={description}
          />
        </View>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: 'teal', width: 200}]}
          onPress={() => UploadData()}>
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

      <TouchableOpacity onPress={() => UploadBanner()} style={styles.btn}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Select Banner Image
          </Text>
        </TouchableOpacity>
        {bannerPercent != 0 ? (
          <Text style={{alignSelf: 'center', color: 'white'}}>
            {bannerPercent} % Verifying Please Upload Now
          </Text>
        ) : null}
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: 'teal', width: 300, }]}
          onPress={() => UploadBannerToDatabase()}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
           Upload Banner To Server
          </Text>
        </TouchableOpacity>

    </ScrollView>
  );
};

export default Admin;
const styles = StyleSheet.create({
  textinput: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    height: 40,
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    paddingLeft: 20,
    borderRadius: 8,
  },
  btn: {
    height: 25,
    width: 250,
    backgroundColor: 'tomato',
    margin: 10,
    borderRadius: 5,
    alignSelf:'center'
  },
});
