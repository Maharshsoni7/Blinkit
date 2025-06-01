// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';






const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name={'SplashScreen'} options={{ headerShown: false }} component={SplashScreen} />
        </Stack.Navigator>
    )
}

const AppNavigator = () => (
    <NavigationContainer ref={navigationRef}>
        <MainStack />
    </NavigationContainer>

);

export default AppNavigator;
