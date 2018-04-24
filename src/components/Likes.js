import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class Like extends Component {


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
        const {foto, likeCallBack} = this.props;
        return (

            <View>
                <TouchableOpacity onPress={likeCallBack}>
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