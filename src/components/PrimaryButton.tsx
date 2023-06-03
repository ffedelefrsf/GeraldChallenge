import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';
import { colors } from 'utils/colors';

interface Props {
  label: string;
  onPress: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  customContainerStyle?: ViewStyle;
  customButtonStyle?: ViewStyle;
  customLabelStyle?: TextStyle;
  uppercase?: boolean;
  verticalLinear?: boolean;
  disabled?: boolean;
}

const PrimaryButton: React.FC<Props> = ({
  label,
  onPress,
  leftIcon,
  rightIcon,
  customContainerStyle,
  uppercase,
  customButtonStyle,
  customLabelStyle,
  verticalLinear,
  disabled,
}) => {
  return (
    <LinearGradient
      {...(!verticalLinear && { start: { x: 0, y: 0 } })}
      colors={
        verticalLinear
          ? [colors.PRIMARY, colors.LIGHT_RED]
          : disabled
          ? [colors.LIGHT_GREY, colors.LIGHT_GREY]
          : [colors.LIGHT_RED, colors.PRIMARY]
      }
      style={[styles.container, customContainerStyle]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, customButtonStyle && customButtonStyle]}>
        <View>
          {leftIcon}
          <Text style={[styles.label, customLabelStyle]}>
            {uppercase ? label.toLocaleUpperCase() : label}
          </Text>
          {rightIcon}
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  label: {
    color: colors.WHITE,
    fontWeight: '600',
    fontSize: 18,
  },
});

export default React.memo(PrimaryButton);
