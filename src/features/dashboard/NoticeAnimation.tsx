import { View, Text, Platform, StyleSheet, Animated } from 'react-native'
import React, { FC } from 'react'
import { NoticeHeight, screenHeight } from '@utils/Scaling'
import Notice from '@components/dashboard/Notice'


const NOTICE_HIGHT = -(NoticeHeight + 12);

const NoticeAnimation: FC<{ noticePosition: any; children: React.ReactElement }> = ({ noticePosition, children }) => {
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.noticeContainer, { transform: [{ translateY: noticePosition }] }]}>
                <Notice />
            </Animated.View>
            <Animated.View style={[styles.contentContainer, {
                paddingTop: noticePosition.interpolate({
                    inputRange: [NOTICE_HIGHT, 0],
                    outputRange: [0, NOTICE_HIGHT + 20]
                })
            }]}>
                {children}
            </Animated.View>
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