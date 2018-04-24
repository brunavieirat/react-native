import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class Likes extends Component {


    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png')
            : require('../../resources/img/s2.png')
    }

    exibeLikes = (likers) => {
        if (likers.length < 1)
            return

        return (

            <Text style={styles.curtidas}> {likers.length} curtidas </Text>
        )
    }

    render() {

        return (

            <View>
                <TouchableOpacity onPress={this.like}>
                    <Image style={styles.likeButton}
                        source={this.carregaIcone(foto.likeada)}
                    />

                </TouchableOpacity>

                {this.exibeLikes(foto.likers)}

            </View>

        )
    }
}

const styles = StyleSheet.create({
    likeButton: {
        height: 30,
        width: 30
      },
})