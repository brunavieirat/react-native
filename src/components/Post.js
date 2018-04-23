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


export default class Post extends Component {

  constructor(props) {
    super(props)
    this.state = {
      foto: this.props.foto,
      valorComentario: ''
    }
  }


  carregaIcone(likeada) {
    return likeada ? require('../../resources/img/s2-checked.png')
      : require('../../resources/img/s2.png')
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

  exibeLikes = (likers) => {
    if (likers.length < 1)
      return

    return (

      <Text style={styles.curtidas}> {likers.length} curtidas </Text>
    )
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

  adicionaComentario = () => {

    if(this.state.valorComentario==='')
    return

    const novaLista = [...this.state.foto.comentarios, {
      id: this.state.valorComentario,
      login: 'meuUsuario',
      texto: this.state.valorComentario
    }]
    

      const fotoAtualizada ={
        ...this.state.foto,
        comentarios: novaLista
      }

      this.setState({foto: fotoAtualizada, valorComentario:''})

    
    this.inputComentario.clear();

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
          <TouchableOpacity onPress={this.like}>
            <Image style={styles.likeButton}
              source={this.carregaIcone(foto.likeada)}
            />

          </TouchableOpacity>

          {this.exibeLikes(foto.likers)}

          <View>
            {this.exibeLegenda(foto)}


            {foto.comentarios.map(comentario =>
              <View style={styles.comentario} key={comentario.id}>
                <Text style={styles.tituloComentario}>{comentario.login}</Text>
                <Text> {comentario.texto}</Text>

              </View>

            )}

          </View>

          <View style={styles.novoComentario}>
            <TextInput style={styles.input}
              placeholder="Adicione um comentario..."
              ref={input => this.inputComentario = input}
              onChangeText={texto => this.setState({ valorComentario: texto })}
            />
            <TouchableOpacity onPress={this.adicionaComentario}>
              <Image style={styles.icone}
                source={require('../../resources/img/send.png')} />
            </TouchableOpacity>
          </View>
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
  },

  input: {
    flex: 1,
    height: 40
  },

  icone: {
    height: 30,
    width: 30
  },

  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }

});
