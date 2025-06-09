/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, ScrollView } from 'react-native';
import React, { FC, useState } from 'react';
import { deliveryLogin } from '@service/authService';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import { screenHeight } from '@utils/Scaling';

import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';

const DeliveryLogin: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await deliveryLogin(email, password);
            resetAndNavigate('');
        } catch (error) {
            console.error('Delivery login error:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <CustomSafeAreaView>
            <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" >
                <View style={styles.container}>
                    <View style={styles.lottieContainer}>
                        <LottieView
                            autoPlay
                            loop
                            source={require('@assets/animations/delivery_man.json')}
                            style={styles.lottie}
                            hardwareAccelerationAndroid
                        />
                    </View>
                    <CustomText variant="h3" fontFamily={Fonts.Bold} >
                        Delivary parten Portal
                    </CustomText>
                    <CustomText variant="h6" fontFamily={Fonts.SemiBold} style={styles.text}>
                        Faster then Flash ⚡
                    </CustomText>

                    <CustomInput
                        onChangeText={(text) => { setEmail(text); }}
                        onClear={() => setEmail('')}
                        value={email}
                        placeholder="Enter your E-mail"
                        left={
                            <Icon name={'mail'} size={RFValue(18)} color={'#f8890E'} style={{ marginLeft: 10 }} />
                        }
                        inputMode="email"
                        right={false}
                    />
                    <CustomInput
                        onChangeText={(text) => { setPassword(text); }}
                        onClear={() => setPassword('')}
                        value={password}
                        placeholder="Password"
                        left={
                            <Icon name={'key-sharp'} size={RFValue(18)} color={'#f8890E'} style={{ marginLeft: 10 }} />
                        }
                        secureTextEntry
                        right={false}
                    />

                    <CustomButton
                        disabled={email.length === 0 || password.length < 8}
                        title="Login"
                        onPress={handleLogin}
                        loading={loading}
                    />
                </View>

            </ScrollView>
        </CustomSafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    lottie: {
        height: '100%',
        width: '100%',
    },
    lottieContainer: {
        height: screenHeight * 0.3,
        width: '100%',
    },
    text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8,
    },

});
export default DeliveryLogin;
