/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Post from './src/components/Post'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList
} from 'react-native';


export default class InstaluraMobile extends Component {

  constructor(){
    super()
    this.state ={
      fotos:[]
    }
  }

componentDidMount(){
  fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
  .then(response=> response.json())
  .then(json => this.setState({fotos:json})
)
//alert(this.state.fotos)
  
  
}




  render() {

    /* const fotos = [
      { id: 1, usuario: 'bruna' },
      { id: 2, usuario: 'dani' },
      { id: 3, usuario: 'ju' },
      { id: 4, usuario: 'shirley' }
    ] */

    return (
      /*  <ScrollView style={{marginTop: 20}}>     
 
       {fotos.map(foto =>
       <View key={foto.id}>
       <Text> {foto.usuario} </Text>
       <Image source={require('./resources/img/alura.jpg')}
       style={{width: screen.width, height: screen.width}}/>
       </View>
       )}
 
       </ScrollView> */

      <FlatList
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>

         <Post fotos={item} />

        }
      />

    );
  }
}



AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
