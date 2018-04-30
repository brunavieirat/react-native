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
    AsyncStorage,
    TextInput
} from 'react-native';

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: '',
            validacao: ''
        }
    }

    efetuaLogin = () => {

        const request = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha,
            }),
            headers: new Headers({
                "Content-type": "application/json"
            })

        }

        const uri = 'https://instalura-api.herokuapp.com/api/public/login'

        //  const uri = 'http://192.168.0.137:8080/api/public/login'

        fetch(uri, request)
            .then(response => {
                if (!response.ok)
                    throw new Error('Não deu certo. Arruma!');
                return response.text()
            })
            .then(token => {
                const usuario = {
                    nome: this.state.usuario,
                    token
                }

                //console.warn(token)
                AsyncStorage.setItem('usuario', JSON.stringify(usuario))
               // console.warn('OK')
                //    AsyncStorage.setItem('usuario', this.state.usuario)

                /*  AsyncStorage.getItem('usuario')
                 .then(usuarioStringfied =>{JSON.parse(usuarioStringfied)})
                 .then(usuario =>{console.warn(usuario.nome)}) */

                 //Navegando para o Feed

                 this.props.navigator.push({
                     screen: 'Feed',
                     title: 'Feed'
                 })
            })
            .catch(error => {
                this.setState({ validacao: error.message })
            })
    }

    efetuaLogout = () => {

        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('usuario')


    }

    render() {

        return (
            <View style={styles.container}>

                <Image source={require('../../resources/img/send.png')} />
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder="Usuário..."
                        onChangeText={texto => this.setState({ usuario: texto })}
                    />

                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Digite sua senha"
                        onChangeText={texto => this.setState({ senha: texto })}
                    />
                    <Text style={styles.erro}> {this.state.validacao} </Text>
                    <Button style={styles.login}
                        title="Login"
                        onPress={this.efetuaLogin} />
                    <Button title="Logout"
                        onPress={this.efetuaLogout} />
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: Dimensions.get('screen').width * 0.8
    },
    erro: {
        color: 'red',
        fontWeight: 'bold',
        margin: 10
    },
    login: {
        marginBottom: 110
    }

})