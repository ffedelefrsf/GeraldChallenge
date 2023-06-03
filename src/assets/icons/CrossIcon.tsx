import React from 'react';
import FeatherIcons from 'react-native-vector-icons/Feather';

import { colors } from 'utils/colors';

interface Props {
  customColor?: string;
  customSize?: number;
}

const CrossIcon: React.FunctionComponent<Props> = ({
  customColor,
  customSize,
}) => {
  return (
    <FeatherIcons
      name="x"
      size={customSize ?? 20}
      color={customColor ?? colors.PRIMARY}
    />
  );
};

export default React.memo(CrossIcon);
