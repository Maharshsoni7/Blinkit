import { View, StyleSheet, Image } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Colors } from '@utils/Constants';
import Logo from '@assets/images/logo.jpeg'; // Adjust the path as necessary
import { screenHeight, screenWidth } from '@utils/Scaling';
import { navigate } from '@utils/NavigationUtils';
const SplashScreen: FC = () => {

  useEffect(() => {

    const navigateUser = () => {
      try {
        navigate('CustomerLogin'); 
      }
      catch (error) {
        console.error('Error navigating from SplashScreen:', error);
      }
    }
    const timer = setTimeout(navigateUser, 2000);
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
    width: screenWidth * 0.7,
    height: screenHeight * 0.7,
    resizeMode: 'contain',
  },

})
export default SplashScreen;
