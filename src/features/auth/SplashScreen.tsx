import { View, StyleSheet, Image, Alert } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '@utils/Constants';
import Logo from '@assets/images/logo.jpeg'; // Adjust the path as necessary
import { screenHeight, screenWidth } from '@utils/Scaling';
// import { navigate } from '@utils/NavigationUtils';

import { useAuthStore } from '@state/authStore';
import { tokenStorage } from '@state/storage';
import { jwtDecode } from 'jwt-decode'
import { resetAndNavigate } from '@utils/NavigationUtils';
import Geolocation from '@react-native-community/geolocation';
import { refetchUser, refresh_token } from '@service/authService';


Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
})

interface DecodedToken {
  exp: number
}
const SplashScreen: FC = () => {

  const { user, setUser } = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string;
    const refreshToken = tokenStorage.getString('refreshToken') as string;

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken.exp > currentTime) {
        resetAndNavigate('CustomerLogin');
        Alert.alert('Session Expired', 'Please login again');
        return false;
      }


      if (decodedAccessToken.exp > currentTime) {
        try {
          refresh_token()
          await refetchUser(setUser)

        } catch (error) {
          console.log("error", error)
          Alert.alert("There was problem in refresh_token")
          return false;
        }

      }
      if (user?.role === 'Customer') {
        resetAndNavigate('ProductDashboard');
      }
      else {
        resetAndNavigate('DeliveryDashboard');
      }
      return true;
    }
    resetAndNavigate('CustomerLogin');
    return false;

  }




  useEffect(() => {

    const initialStartUp = () => {
      try {
        Geolocation.requestAuthorization()
        tokenCheck()
      }
      catch (error) {
        console.error('Sorry we need location service to give you better shopping experiences', error);
      }
    };
    const timer = setTimeout(initialStartUp, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logoImage} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  logoImage: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.4,
    resizeMode: 'contain',
  },

});
export default SplashScreen;
