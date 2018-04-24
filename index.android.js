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

  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      //fetch('http://10.0.2.2:8080/api/fotos/rafael')
      .then(response => response.json())
      .then(json => this.setState({ fotos: json })
      )
    //alert(this.state.fotos)

  }

  buscaporId=(idFoto)=>{
    const foto = this.state.fotos.find(foto => foto.id === idFoto)
   // console.warn(foto)
    return foto

  }

  atualizaFotos(fotoAtualizada){
    const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    return fotos
  }

  like = (idFoto) => {

  //  const foto = this.state.fotos.find(foto => foto.id === idFoto)

  //buscaporId(idFoto)
  //  console.warn(idFoto)
 // console.warn(this.buscaporId(idFoto))
  const foto = this.buscaporId(idFoto)

    let novaLista = []
    if (!foto.likeada)
      novaLista = [
        ...foto.likers,
        { login: 'brunavieira' }
      ]
    else
      novaLista = foto.likers
        .filter(liker => liker.login != 'brunavieira')

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }

    const fotos = this.atualizaFotos(fotoAtualizada)
    this.setState({
      fotos
    })
  }

  adicionaComentario = (idFoto, valorComentario) => {

    if (valorComentario === '')
      return

      const foto = this.buscaporId(idFoto)

   // const foto = this.state.fotos.find(foto => foto.id === idFoto)



    const novaLista = [...foto.comentarios, {
      id: valorComentario,
      login: 'meuUsuario',
      texto: valorComentario
    }]


    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }

   // const fotos = this.state.fotos.map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
      const fotos= this.atualizaFotos(fotoAtualizada)
    this.setState({ fotos })
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

          <Post foto={item}
            likeCallBack={this.like} 
            comentarioCallBack={this.adicionaComentario}/>

        }
      />

    );
  }
}



AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
