import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Button,
  TextInput
} from 'react-native';

export default class Login extends Component{

    constructor(){
        super()
        this.state={
            usuario: '',
            senha: ''
        }
    }
    render(){

        return(
            <View style={styles.container}>

                <View style={styles.form}>
                <TextInput style={styles.input}
                placeholder="Usuário..."
                onChangeText={texto => this.setState({usuario: texto})}
                />

                <TextInput style={styles.input}
                placeholder="Digite sua senha"
                onChangeText={texto => this.setState({senha: texto})}
                />

                <Button title="Login"
                onPress={() => console.warn('oook')} />
            </View>
                </View>

        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
       // borderBottom: '#ddd'
       
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'        
    },
    form:{
        width: Dimensions.get('screen').width * 0.8
    }

})