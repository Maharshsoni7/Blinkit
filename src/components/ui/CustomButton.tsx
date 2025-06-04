import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';

interface Props {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
}
const CustomButton: FC<Props> = ({ title, onPress, disabled, loading }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: disabled ? Colors.disabled : Colors.secondary }]}>
            {loading ?
                <ActivityIndicator color={'#fff'} size='small' />
                : <CustomText style={styles.buttonText} variant='h6' fontFamily={Fonts.SemiBold}>
                    {title}
                </CustomText>
            }
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        marginVertical: 15,
        backgroundColor: '#6200ee',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#ffffff',

    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },

})
export default CustomButton