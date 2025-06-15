import { View, Text, Platform, StyleSheet, Animated as RNAnimated, } from 'react-native'
import React, { FC } from 'react'
import { NoticeHeight, screenHeight } from '@utils/Scaling'
import Notice from '@components/dashboard/Notice'


const NOTICE_HIGHT = -(NoticeHeight + 12);

const NoticeAnimation: FC<{ noticePosition: any; children: React.ReactElement }> = ({ noticePosition, children }) => {
    return (
        <View style={styles.container}>
            <RNAnimated.View style={[styles.noticeContainer, { transform: [{ translateY: noticePosition }] }]}>
                <Notice />
            </RNAnimated.View>
            <RNAnimated.View style={[styles.contentContainer, {
                paddingTop: noticePosition.interpolate({
                    inputRange: [NOTICE_HIGHT, 0],
                    outputRange: [0, NoticeHeight + 20]
                })
            }]}>
                {children}
            </RNAnimated.View>
        </View>
    )
}
const styles = StyleSheet.create({

    noticeContainer: {
        width: '100%',
        position: 'absolute',
        zIndex: 999
    },
    contentContainer: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'white'

    }
})
export default NoticeAnimation