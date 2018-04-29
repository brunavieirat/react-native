import Feed from './components/Feed'
import Login from './screens/Login'
//import {AppRegistry} from 'react-native'
import { Navigation } from 'react-native-navigaton'


export default() =>{

//AppRegistry.registerComponent('InstaluraMobile', () => Login);
Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'Login',
        title: 'Login'
    }
})

}