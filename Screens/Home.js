import React,{useState, useEffect} from 'react'
import { View, Text, Image, ScrollView , StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'
import Header from './components/Header'
// import data from '../data.json'
import firestore from '@react-native-firebase/firestore';

import LottieView from 'lottie-react-native';

import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Slider from './components/Slider';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [data, setdata] = useState();
  const [bannerimg, setBannerimg] = useState()
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
    const [image, setimage] = useState([
        "data:image/jpeg;base64,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",
        
    ])

   

    
  //  function onAuthStateChanged(user) {
  //   setUser(user);
  //   console.log('user', user)
  //   if (initializing) setInitializing(false);
  // }

  //  useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  // if (initializing) return null;
  // if (!user) {
  //   navigation.replace('Login')
  // }

  useEffect(() => {
    fetchData()
    fetchBanner()
    // OnSignal.setLogLevel(6, 0);
    // OneSignal.setAppId("80484845-72d8-43f1-827d-e1a7506dce00");

    // OnSignal.setNotificationOpenedHandler(notification =>{
    //   console.log("OneSignal: notification opened:", notification);
    // })

   // const interval = setInterval(() => {
   // fetchData()
   // }, 10000);
 
   // return () => clearInterval(interval); 
 }, [])
  
 
    const fetchData = async () => {
     try {
       let list = [];
       await firestore()
         .collection('MoviesData')
         .get()
         .then(querySnapshot => {
         
           querySnapshot.forEach(doc => {
             const {
               category,
               description,
               id,
               image,
               title,
               type,
               video,
               year,
             } = doc.data();
             list.push({
               title: title,
               category: category,
               year: year,
               Description: description,
               image: image,
               type: type,
               video: video,
               id: id,
             });
           });
         });
 
       console.log('list', list);
       setdata(list);
       JSON.stringify(data)
       console.log('data', data);
       
     } catch (error) {
       console.log(error);
     }
   };

   const fetchBanner = async () => {
    try {
      let list2 = [];
      let list3=[];
      await firestore()
        .collection('BannerImage')
        .get()
        .then(querySnapshot => {
        
          querySnapshot.forEach(doc => {
            const {
             
              banner
            } = doc.data();
            console.log(
              'doc', doc.data()
            )
            list2.push({
               banner
             
            });
          });
        });

      console.log('list2', list2);
      // setBannerimg(list2);
      list2.map((item,index)=>{
        list3.push(
          item.banner
         
        )
      })
       setBannerimg(list3);
      console.log('list3', list3)
      
    } catch (error) {
      console.log(error);
    }
  };





// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('isLoggedIn')
//     if(value == 'false') {
//       navigation.replace('Login')
//     }
//   } catch(e) {
//     // error reading value
//   }
// }

    return (
        <View style={{backgroundColor:'black', height:'100%'}}>
          {/* <Header navigation={navigation}/>   */}
          <ScrollView>
          {bannerimg === undefined ? <View style={{flex:1,alignItems:'center', justifyContent:'center'}}><LottieView source={require('../Images/loading.json')} autoPlay loop style={{height:80, width:80}} /></View> 
          : 
          
          
            <SliderBox
          images={bannerimg}
          sliderBoxHeight={180}
         
          onCurrentImagePressed={index => navigation.navigate('AllContent')}
        //   onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
        autoplay
        circleLoop
        imageLoadingColor="tomato"
        ImageComponentStyle={{borderRadius: 10}}
        />
          
          }
         
<Image
        style={{height:100, width:'100%', marginTop:20}}
        source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSElnNpJw_h20-offoCqVlnptyb73LrA9ANhw&usqp=CAU',
          }}
      />
      
      <View>
      <Text style={styles.scrollViewText} >Special For You</Text>
<ScrollView horizontal={true}>
{data === undefined ? <View style={{flex:1,alignItems:'center', justifyContent:'center'}}><LottieView source={require('../Images/loading.json')} autoPlay loop style={{height:80, width:80}} /></View> 
          : 
          data.filter((item) => item.type ==='special').map((item, index )=>(
  
  <View style={styles.scrollViewStyle} key={index}>
    <TouchableOpacity onPress={()=>navigation.navigate('Player',{item})}>
    
  <Image
          style={{height:'100%', width:'100%', borderRadius:10}}
          source={{
              uri: item.image,
            }}
        />
       </TouchableOpacity>
        {/* <Text style={{color:"white"}}>{item.type}</Text> */}
  </View>
    ))}



</ScrollView>
</View>
      <TouchableOpacity onPress={()=>navigation.navigate('Special Movies')}>
      <Text style={styles.seemore}>See More</Text>
      </TouchableOpacity>
     
      <View>
      <Text style={styles.scrollViewText} >Trending Shows</Text>
<ScrollView horizontal={true}>
{data === undefined ? <View style={{flex:1,alignItems:'center', justifyContent:'center'}}><LottieView source={require('../Images/loading.json')} autoPlay loop style={{height:80, width:80}} /></View> 
          : 
          
    data.filter((item) => item.type === 'trending').map((item, index )=>
  
  <View style={styles.scrollViewStyle} key={index}>
    <TouchableOpacity onPress={()=>navigation.navigate('Player',{item})}>
    
  <Image
          style={{height:'100%', width:'100%', borderRadius:10}}
          source={{
              uri: item.image,
            }}
        />
       </TouchableOpacity>
        {/* <Text style={{color:"white"}}>{item.type}</Text> */}
  </View>
    )}



</ScrollView>
</View>
      <TouchableOpacity onPress={()=>navigation.navigate('Trending Movies')}>
      <Text style={styles.seemore}>See More</Text>
      </TouchableOpacity>
      

     
      
        </ScrollView>
        </View>
    )
}

export default Home
const styles= StyleSheet.create({
  seemore:{
    color:'white',
    alignSelf:'center',
    fontWeight:'bold',
    margin:10,
    fontSize:15
  },
  scrollViewStyle:{
    height:130,
    width:120,
    margin:10,
    backgroundColor:'black'
      },
      scrollViewText:{
        fontSize:20,
        fontWeight:'bold',
        color:'tomato',
        margin:10,
      
      }
})


