import { View, StyleSheet, SafeAreaView, Animated, Image, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/Productslider'
import { Colors, Fonts, lightColors } from '@utils/Constants'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { resetAndNavigate } from '@utils/NavigationUtils'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'
import LinearGradient from 'react-native-linear-gradient'
import CustomInput from '@components/ui/CustomInput'

const bottomColors = [...lightColors].reverse()
const CustomerLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [gestureSequence, setGestureSequence] = useState<string[]>([]);

    const animatedValue = useRef(new Animated.Value(0)).current;

    let keyboardOffsetHeight = useKeyboardOffsetHeight()

    useEffect(() => {
        if (keyboardOffsetHeight === 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
        else {
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.84,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }
    }, [keyboardOffsetHeight])

    const handleGesture = ({ nativeEvent }: any) => {
        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent
            let direction = '';
            if (Math.abs(translationX) > Math.abs(translationY)) {
                direction = translationX > 0 ? 'right' : 'left';
            }
            else {
                direction = translationY > 0 ? 'down' : 'up';
            }
            const newSequence = [...gestureSequence, direction].slice(-5);
            setGestureSequence(newSequence);
            if (newSequence?.join(' ') === 'up up down left right') {
                setGestureSequence([])
                resetAndNavigate('DeliveryLogin')

            }
        }
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <CustomSafeAreaView>
                    <ProductSlider />
                    <PanGestureHandler onHandlerStateChange={handleGesture}>
                        <Animated.ScrollView
                            bounces={false}
                            style={{ transform: [{ translateY: animatedValue }] }}
                            keyboardDismissMode='on-drag'
                            keyboardShouldPersistTaps='handled'
                            contentContainerStyle={styles.subContainer}
                        >
                            <LinearGradient colors={bottomColors} style={styles.gradient} />
                            <View style={styles.content}>
                                <Image source={require('@assets/images/logo.jpeg')} style={styles.logo} />

                                <CustomText variant='h2' fontFamily={Fonts.Bold} >
                                    Binkit
                                </CustomText>
                                <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>
                                    Login in or sign up
                                </CustomText>

                                <CustomInput
                                    onChangeText={(text) => { setPhoneNumber(text.slice(0, 10)) }}
                                    onClear={() => setPhoneNumber('')}
                                    value={phoneNumber}
                                    placeholder='Enter your phone number'
                                    keyboardType='phone-pad'
                                    left={
                                        <CustomText
                                            style={styles.phoneText}
                                            variant='h6'
                                            fontFamily={Fonts.SemiBold}
                                        >
                                            +91
                                        </CustomText>
                                    }
                                />

                            </View>
                        </Animated.ScrollView>
                    </PanGestureHandler>

                    <View style={styles.footer}>
                        <SafeAreaView />
                        <CustomText fontSize={RFValue(6)}  >
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </CustomText>
                        <SafeAreaView />
                    </View>

                </CustomSafeAreaView>
            </View>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    phoneText: {
        marginLeft: 10,

    },
    text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8,
    },
    footer: {
        borderTopWidth: 0.8,
        borderColor: Colors.border,
        paddingBottom: 10,
        zIndex: 22,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f9fc',
        width: '100%',
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 20,
        marginVertical: 10,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    gradient: {
        width: '100%',
        paddingTop: 60,

    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: 20,
    }
})
export default CustomerLogin