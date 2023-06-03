import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { Portal } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from 'utils/colors';
import OpaqueDismissableBackground from 'components/OpaqueDismissableBackground';

const GradientOrWhiteBackground: React.FC<{
  gradientBackground: boolean | undefined;
  children: React.ReactNode;
}> = ({ gradientBackground, children }) => {
  return (
    <View style={styles.fullscreenContainer}>
      {gradientBackground ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          colors={[colors.WHITE, colors.SKY]}
          style={styles.flexGrow}>
          {children}
        </LinearGradient>
      ) : (
        children
      )}
    </View>
  );
};

const ModalContainer: React.FC<{
  fullscreen: boolean | undefined;
  children: React.ReactNode;
  requireScroll: boolean;
  onDismiss: () => void;
  gradientBackground: boolean | undefined;
  customDialogContainerStyle?: ViewStyle;
  customScreenContainerStyle?: ViewStyle;
}> = ({
  fullscreen,
  children,
  requireScroll,
  onDismiss,
  gradientBackground,
  customScreenContainerStyle,
  customDialogContainerStyle,
}) => {
  return fullscreen ? (
    <Portal>
      <GradientOrWhiteBackground gradientBackground={gradientBackground}>
        <SafeAreaView style={[styles.flex, customScreenContainerStyle]}>
          {children}
        </SafeAreaView>
      </GradientOrWhiteBackground>
    </Portal>
  ) : (
    <OpaqueDismissableBackground handleDismiss={onDismiss}>
      <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
        <View
          style={[
            styles.dialogContainer,
            requireScroll ? styles.heightForScroll : {},
            customDialogContainerStyle,
          ]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </OpaqueDismissableBackground>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  flexGrow: { flexGrow: 1 },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  dialogContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    maxHeight: '80%',
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  heightForScroll: { height: '80%' },
});

export default ModalContainer;
