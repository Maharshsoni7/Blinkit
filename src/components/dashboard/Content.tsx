import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { adData, categories } from '@utils/dummyData'
import AdCarousal from './AdCarousal'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CategoryContainer from './CategoryContainer'

const Content = () => {
    return (
        <View style={styles.container}>
            <AdCarousal addData={adData} />
            <CustomText variant='h5' fontFamily={Fonts.SemiBold}> Grocery & kitchen  </CustomText>
            <CategoryContainer data={categories} />
            <CustomText variant='h5' fontFamily={Fonts.SemiBold}> BestSeller </CustomText>
            <CategoryContainer data={categories} />
            <CustomText variant='h5' fontFamily={Fonts.SemiBold}> Home & Life Style </CustomText>
            <CategoryContainer data={categories} />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
})

export default Content