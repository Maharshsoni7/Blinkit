import { StyleSheet, Animated as RNAnimated, Platform, SafeAreaView, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { NoticeHeight, screenHeight } from '@utils/Scaling'
import { CollapsibleContainer, CollapsibleScrollView, useCollapsibleContext, CollapsibleHeaderContainer, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import Geolocation from '@react-native-community/geolocation'
import { reverseGeocode } from '@service/mapService'
import { useAuthStore } from '@state/authStore'
import NoticeAnimation from './NoticeAnimation'
import Visuals from './Visuals'


const NOTICE_HIGHT = -(NoticeHeight + 12);
console.log("NOTICE_HIGHT", NOTICE_HIGHT);

const ProductDashboard = () => {
    const { user, setUser } = useAuthStore()

    const noticePosition = new Animated.Value(NOTICE_HIGHT);


    const slideUp = () => {
        RNAnimated.timing(noticePosition, {
            toValue: NOTICE_HIGHT,
            duration: 1200,
            useNativeDriver: false,

        }).start()
    }

    const slideDown = () => {
        RNAnimated.timing(noticePosition, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: false,

        }).start()
    }

    useEffect(() => {
        const updateUser = () => {
            Geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                reverseGeocode(latitude, longitude, setUser)
            },
                error => console.log("error", error),
                {
                    enableHighAccuracy: false,
                    timeout: 15000
                }
            )
        }
        updateUser();
        // slideDown();
    }, []);
    return (
        <NoticeAnimation noticePosition={noticePosition}>
            <>
                <Visuals />
                <SafeAreaView />
            </>
        </NoticeAnimation>
    )
}
const styles = StyleSheet.create({

    panelContainer: {
        flex: 1
    },
    transparent: {
        backgroundColor: 'transparent'
    },
    backToTopButton: {
        position: 'absolute',
        alignSelf: 'center',
        top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
        alignContent: 'center',
        flexDirection: 'row',
        gap: 4,
        backgroundColor: 'black',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        zIndex: 999

    }
})

export default withCollapsibleContext(ProductDashboard);
