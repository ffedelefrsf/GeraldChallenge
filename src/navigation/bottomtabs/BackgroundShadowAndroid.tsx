import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BackgroundShadowAndroid: React.FC<{
  bottomBarHeight: number;
  shadowOpacity: number;
}> = ({ bottomBarHeight, shadowOpacity }) => (
  <View
    style={[styles.backgroundAndroidContainer, { bottom: bottomBarHeight }]}>
    <LinearGradient
      style={styles.gradient}
      colors={['rgba(0, 0, 0, 0)', `rgba(0, 0, 0, ${shadowOpacity})`]}
    />
  </View>
);

const styles = StyleSheet.create({
  backgroundAndroidContainer: {
    position: 'absolute',
    width: '100%',
    height: 40,
  },
  gradient: { height: 40 },
});

export default BackgroundShadowAndroid;
