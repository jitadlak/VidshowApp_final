import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import data from '../../data.json'
const Slider = (props) => {

  // console.log(data)
    return (
        <View>
      <Text style={styles.scrollViewText} >Special For You</Text>
<ScrollView horizontal={true}>

    {data.slice(0,7).map((item, index )=>
  
  <View style={styles.scrollViewStyle} key={index}>
    <TouchableOpacity onPress={()=>props.navigation.navigate('Player',{item})}>
    
  <Image
          style={{height:'100%', width:'100%'}}
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
    )
}

export default Slider
const styles= StyleSheet.create({
    scrollViewStyle:{
  height:130,
  width:120,
  margin:10,
  backgroundColor:'white'
    },
    scrollViewText:{
      fontSize:20,
      fontWeight:'bold',
      color:'tomato',
      margin:10,
    
    }
  })
