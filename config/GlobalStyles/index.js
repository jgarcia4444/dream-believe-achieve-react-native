
import { Dimensions } from 'react-native';
const {height, width} = Dimensions.get('screen');

import Colors from '../Colors';
const {white} = Colors;

const GlobalStyles = {

    container: {
        width: width,
        height: height,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.02,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    }

}

export default GlobalStyles;