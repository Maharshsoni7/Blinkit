import { Text, TextStyle, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts, } from "@utils/Constants";
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
    variant?:
    'h1' |
    'h2' |
    'h3' |
    'h4' |
    'h5' |
    'h6' |
    'h7' |
    'h8' |
    'h9' |
    'body';
    fontFamily?: Fonts
    fontSize?: number;
    style?: TextStyle | TextStyle[];
    children?: React.ReactNode;
    numberOfLines?: number;
    onLayout?: (event: any) => void;
}

const CustomText: FC<Props> = ({
    variant = 'body',
    fontFamily = Fonts.Regular,
    fontSize,
    style,
    children,
    numberOfLines,
    onLayout,

}) => {
    let computedFontSize: number;
    switch (variant) {
        case 'h1':
            computedFontSize = RFValue(fontSize || 22);
            break;
        case 'h2':
            computedFontSize = RFValue(fontSize || 20);
            break;
        case 'h3':
            computedFontSize = RFValue(fontSize || 18);
            break;
        case 'h4':
            computedFontSize = RFValue(fontSize || 16);
            break;
        case 'h5':
            computedFontSize = RFValue(fontSize || 14);
            break;
        case 'h6':
            computedFontSize = RFValue(fontSize || 12);
            break;
        case 'h7':
            computedFontSize = RFValue(fontSize || 10);
            break;
        case 'h8':
            computedFontSize = RFValue(fontSize || 10);
            break;
        case 'h9':
            computedFontSize = RFValue(fontSize || 9);
            break;
        default:
            computedFontSize = fontSize || RFValue(12);
            break;
    }

    const fontFamilyStyle = {
        fontFamily
    }
    return (

        <Text
            onLayout={onLayout}
            style={[
                styles.text,
                { fontSize: computedFontSize, color: Colors.text, },
                fontFamilyStyle,
                style
            ]}
            numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
        >
            {children}
        </Text>

    )
}
const styles = StyleSheet.create({
    text: {
        textAlign: 'left',

    },

})
export default CustomText