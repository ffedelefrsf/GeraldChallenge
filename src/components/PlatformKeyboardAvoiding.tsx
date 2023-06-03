import React from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ViewStyle,
} from 'react-native';

import { commonViewStyles } from 'utils/commonStyles';

const PlatformKeyboardAvoiding: React.FC<
  KeyboardAvoidingViewProps & { customContainerStyle?: ViewStyle }
> = props => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      behavior="padding"
      style={props.customContainerStyle ?? commonViewStyles.flex}
      {...props}>
      {props.children}
    </KeyboardAvoidingView>
  ) : (
    <>{props.children}</>
  );
};

export default PlatformKeyboardAvoiding;
