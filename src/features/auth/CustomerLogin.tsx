import { View, StyleSheet, } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/Productslider'



const CustomerLogin = () => {
    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <CustomSafeAreaView>
                    <ProductSlider />
                    {/* Add your login form or other components here */}
                </CustomSafeAreaView>
            </View>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

})
export default CustomerLogin