import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';


export default class Post extends Component {

  constructor(props){
    super(props)
    this.state ={
      foto: this.props.foto
    }
  }

  carregaIcone(likeada){
    return likeada ? require('../../resources/img/s2-checked.png')
    : require('../../resources/img/s2.png')
  }

  like = () =>{

    let novaLista= []
    if(!this.state.foto.likeada)
    novaLista = [
      ...this.state.foto.likers,
      {login: 'brunavieira'}
    ]
    else
    novaLista = this.state.foto.likers
    .filter(liker => liker.login != 'brunavieira')

    const fotoAtualizada = {
      ...this.state.foto,
      likeada: !this.state.foto.likeada,
      likers: novaLista
    }
    this.setState({
      foto: fotoAtualizada
    })
  }

  exibeLikes=(likers)=>{
    if(likers.length>=0)
    return

    return(

      <Text style={styles.curtidas}> {likers.length} curtidas </Text>
    )
  }

  /* exibeLegenda=(foto) =>{
    if(foto.comentario ==='')
    return

    return(
      <View style={styles.comentario}>
      <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
      <Text> {foto.comentario}</Text>

      </View>
    )
  } */


  render() {

    const { foto } = this.state

    return (

      <View>

        <View style={styles.header}>
          <Image source={{ uri: 'https://avatars2.githubusercontent.com/u/32556458?s=460&v=4' }}
            style={styles.profilePicture} />
          <Text> {foto.loginUsuario} </Text>
        </View>
        <Image source={{ uri: foto.urlFoto }}
          style={styles.postImage} />

        <View style={styles.rodape}>
          <TouchableOpacity onPress={this.like}>
            <Image style={styles.likeButton}
              source={this.carregaIcone(foto.likeada)}
            />

          </TouchableOpacity>

        {this.exibeLikes(foto.likers)}
      {/*   {this.exibeLegenda(foto)} */}
         
        </View>
      </View>
    )
  }
}


const screen = Dimensions.get('screen')

const styles = StyleSheet.create({
  header: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  
  profilePicture: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20
  },

  postImage: {
    width: screen.width,
    height: screen.width
  },

  likeButton: {
    height: 30,
    width: 30
  },

  rodape: {
    margin: 10
  },

  curtidas: {
    fontWeight: 'bold'
  },

  comentario: {
    flexDirection: 'row'
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  }

});
