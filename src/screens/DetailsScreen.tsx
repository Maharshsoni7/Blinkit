import React from 'react';
import { View, Text, } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            {/* <Button title="Go to Details" onPress={() => navigation.navigate('Details')} /> */}
        </View>
    );
}
