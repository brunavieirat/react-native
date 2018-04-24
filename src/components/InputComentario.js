import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TextInput
  } from 'react-native';

export default class InputComentario extends Component {

    constructor(){
        super()
        this.state ={
            valorComentario: ''
        }
    }

    render() {

        const { adicionaComentario } = this.props;

        return (
            <View style={styles.novoComentario}>
                <TextInput style={styles.input}
                    placeholder="Adicione um comentario..."
                    ref={input => this.inputComentario = input}
                    underlineColorAndroid="transparent"
                    onChangeText={texto => this.setState({ valorComentario: texto })}
                />
                <TouchableOpacity onPress={() =>{
                     adicionaComentario(this.state.valorComentario)
                     this.inputComentario.clear();

                     }}>
                    <Image style={styles.icone}
                        source={require('../../resources/img/send.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

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



})