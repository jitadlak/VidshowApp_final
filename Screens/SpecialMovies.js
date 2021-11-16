import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ListViewBase,
  TextComponent,
} from 'react-native';
import Header from './components/Header';
// import data from '../data.json';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';

const SpecialMovies = ({navigation}) => {
  const [data, setdata] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let list = [];
  //       await firestore()
  //         .collection('MoviesData')
  //         .get()
  //         .then(querySnapshot => {
  //           // console.log('total data:', querySnapshot.size);
  //           querySnapshot.forEach(doc => {
  //             const {
  //               category,
  //               description,
  //               id,
  //               image,
  //               title,
  //               type,
  //               video,
  //               year,
  //             } = doc.data();
  //             list.push({
  //               title: title,
  //               category: category,
  //               year: year,
  //               Description: description,
  //               image: image,
  //               type: type,
  //               video: video,
  //               id: id,
  //             });
  //           });
  //         });

  //       console.log('list', list);
  //       setdata(list);
  //       console.log('data', data);
  //       // setdata(list)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.log('list', list)


   useEffect(() => {
     fetchData()
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
  


  return (
    <View style={{backgroundColor: 'black', height: '100%'}}>
      {/* <Header/> */}
      <ScrollView>
        <View style={styles.contentView}>
          {data === undefined ? <View style={{flex:1,alignItems:'center', justifyContent:'center', marginTop:'50%'}}><LottieView source={require('../Images/loading.json')} autoPlay loop style={{height:150, width:150}} /></View>
          : 
          
          data.filter((item) => item.type === 'special').map((item, index )=>  (
            <View
              key={index}
              style={{
                height: 150,
                width: 100,
                backgroundColor: 'black',
                margin: 10,
              }}>
                <Text style={{color:'white'}}></Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Player', {item})}>
                <Image
                  style={{height: '100%', width: '100%', borderRadius:5}}
                  source={{
                    uri: item.image,
                  }}
                />
              </TouchableOpacity>
            </View>
          ))}


          
         
          <Text style={{color: '#fff'}}></Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SpecialMovies;
const styles = StyleSheet.create({
  contentView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  textstyle:{
    color:'#fff'
  }
});
