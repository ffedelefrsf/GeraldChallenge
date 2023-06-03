import React from 'react';
import { ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from 'utils/colors';

interface Props {
  customColor?: string;
  customSize?: number;
  customStyle?: ViewStyle;
}

const SimpleCheckmarkIcon: React.FC<Props | any> = ({
  customColor,
  customSize,
  customStyle,
}) => {
  return (
    <MaterialCommunityIcons
      name="check"
      size={customSize ?? 12}
      color={customColor ?? colors.GREY}
      {...(customStyle && { style: customStyle })}
    />
  );
};

export default React.memo(SimpleCheckmarkIcon);
