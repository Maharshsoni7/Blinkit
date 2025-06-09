// AppNavigator.tsx
import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import ProductDashboard from '@features/dashboard/ProductDashboard';






const Stack = createNativeStackNavigator();



const Navigation: FC = () => (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
            initialRouteName='SplashScreen'
            screenOptions={{
                headerShown: false,

            }}
        >
            <Stack.Screen
                name={'SplashScreen'} options={{ headerShown: false }} component={SplashScreen}
            />
            <Stack.Screen
                name={'ProductDashboard'} options={{ headerShown: false }} component={ProductDashboard}
            />
            <Stack.Screen
                name={'CustomerLogin'} options={{ animation: 'fade' }} component={CustomerLogin}
            />
            <Stack.Screen
                name={'DeliveryLogin'} options={{ animation: 'fade' }} component={DeliveryLogin}
            />
        </Stack.Navigator>
    </NavigationContainer>

);

export default Navigation;
