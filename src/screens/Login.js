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

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: ''
        }
    }

    efetuaLogin = () => {

        const request = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                "Content-type": "application/json"
            })

        }

        const uri='https://instalura-api.herokuapp.com/api/public/login'

      //  const uri = 'http://192.168.0.137:8080/api/public/login'

        fetch(uri, request)
            .then(response => {
                if (!response.ok)
                    throw new Error('Não deu certo. Arruma!');
                return response.text()
            })
            .then(token => console.warn(token))
            .catch(error => {
            })
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

                    <Button title="Login"
                        onPress={this.efetuaLogin} />
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
    }

})