import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import InputComentario from './InputComentario'
import Like from './Likes'


export default class Post extends Component {

  constructor(props) {
    super(props)
    this.state = {
      foto: this.props.foto,

    }
  }

  like = () => {

    let novaLista = []
    if (!this.state.foto.likeada)
      novaLista = [
        ...this.state.foto.likers,
        { login: 'brunavieira' }
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
 

  exibeLegenda = (foto) => {
    if (foto.comentario === '')
      return

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text> {foto.comentario}</Text>

      </View>
    )
  }

  adicionaComentario = (valorComentario) => {

    if (valorComentario === '')
      return

    const novaLista = [...this.state.foto.comentarios, {
      id: valorComentario,
      login: 'meuUsuario',
      texto: valorComentario
    }]


    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista
    }
    this.setState({ foto: fotoAtualizada })
  }


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
        
          <View>
          <Like foto={foto} likeCallBack={this.like} />
            {this.exibeLegenda(foto)}

            {foto.comentarios.map(comentario =>
              <View style={styles.comentario} key={comentario.id}>
                <Text style={styles.tituloComentario}>{comentario.login}</Text>
                <Text> {comentario.texto}</Text>

              </View>

            )}

          </View>

          <InputComentario
            adicionaComentario={this.adicionaComentario}
          />

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

  rodape: {
    margin: 10,

  },

  curtidas: {
    fontWeight: 'bold',


  },


  comentario: {
    flexDirection: 'row',
    marginLeft: 5
  },

  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  }

});
