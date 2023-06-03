import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { Portal } from 'react-native-paper';

import { colors } from 'utils/colors';

interface Props {
  handleDismiss: () => void;
  customParentTouchableStyle?: ViewStyle | (ViewStyle | undefined)[];
  customParentViewStyle?: ViewStyle | (ViewStyle | undefined)[];
  children: React.ReactNode;
}

const OpaqueDismissableBackground: React.FC<Props> = ({
  handleDismiss,
  customParentTouchableStyle,
  customParentViewStyle,
  children,
}) => {
  return (
    <Portal>
      <TouchableWithoutFeedback
        style={customParentTouchableStyle ?? StyleSheet.absoluteFill}
        onPress={handleDismiss}>
        <View style={customParentViewStyle ?? styles.container}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.OPAQUE_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OpaqueDismissableBackground;
