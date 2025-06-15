import { View, StyleSheet, Animated as RNAnimated, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { NoticeHeight, screenHeight } from '@utils/Scaling';
import { CollapsibleContainer, CollapsibleScrollView, useCollapsibleContext, CollapsibleHeaderContainer, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible';
import Geolocation from '@react-native-community/geolocation';
import { reverseGeocode } from '@service/mapService';
import { useAuthStore } from '@state/authStore';
import NoticeAnimation from './NoticeAnimation';
import Visuals from './Visuals';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import AnimatedHeader from './AnimatedHeader';
import Content from '@components/dashboard/Content';
import StickySearchbar from './StickySearchbar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const NOTICE_HIGHT = -(NoticeHeight + 12);
console.log('NOTICE_HIGHT', NOTICE_HIGHT);

const ProductDashboard = () => {
    const { user, setUser } = useAuthStore();
    const insets = useSafeAreaInsets()
    const noticePosition = useRef(new RNAnimated.Value(NOTICE_HIGHT)).current;

    const { scrollY, expand } = useCollapsibleContext();
    const previousScroll = useRef<number>(0);

    const backToTopStyle = useAnimatedStyle(() => {
        const isScrollingUp = scrollY.value < previousScroll.current && scrollY.value > 180;
        const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 });
        const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 });
        previousScroll.current = scrollY.value;

        return { opacity, trasfrom: [{ translateY }] };

    });

    const slideUp = () => {
        RNAnimated.timing(noticePosition, {
            toValue: NOTICE_HIGHT,
            duration: 1200,
            useNativeDriver: false,

        }).start();
    };

    const slideDown = () => {
        RNAnimated.timing(noticePosition, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: false,

        }).start();
    };

    useEffect(() => {
        slideDown();
        const timeoutId = setTimeout(() => {
            slideUp();
        }, 3500);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <NoticeAnimation noticePosition={noticePosition}>
            <>
                <Visuals />
                {/* <SafeAreaView /> */}

                <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
                    <TouchableOpacity
                        onPress={() => {
                            scrollY.value = 0;
                            expand();
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>

                        <Icon name="arrow-up-circle-outline" color="white" size={RFValue(12)} />
                        <CustomText variant="h9" style={{ color: 'white' }} fontFamily={Fonts.SemiBold}>
                            Back to top
                        </CustomText>
                    </TouchableOpacity>
                </Animated.View >

                <CollapsibleContainer style={[styles.panelContainer, { marginTop: insets.top || 20 }]}>
                    <CollapsibleHeaderContainer containerStyle={styles.transparent}>
                        <AnimatedHeader showNotice={() => {
                            slideDown();
                            const timeoutId = setTimeout(() => {
                                slideUp();
                            }, 3500);
                            return () => clearTimeout(timeoutId);
                        }} />
                        <StickySearchbar />
                    </CollapsibleHeaderContainer>

                    <CollapsibleScrollView nestedScrollEnabled style={styles.panelContainer} showsVerticalScrollIndicator={false}>

                        <Content />
                        <View style={{ backgroundColor: '#f8f8f8', padding: 20 }}>
                            <CustomText fontFamily={Fonts.Bold} fontSize={RFValue(32)} style={{ opacity: 0.2 }}>
                                BlinkIt 🛒
                            </CustomText>
                            <CustomText fontFamily={Fonts.Bold}
                                style={{ marginTop: 18, paddingBottom: 100, opacity: 0.2 }}>
                                Developd By Ms
                            </CustomText>
                        </View>
                    </CollapsibleScrollView>
                </CollapsibleContainer>
            </>
        </NoticeAnimation >
    );
};
const styles = StyleSheet.create({

    panelContainer: {
        flex: 1,
    },
    transparent: {
        backgroundColor: 'transparent',
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
        zIndex: 999,

    },
});

export default withCollapsibleContext(ProductDashboard);
