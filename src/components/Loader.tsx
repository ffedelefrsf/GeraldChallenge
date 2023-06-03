import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { colors } from 'utils/colors';

interface Props {
  size?: 'large' | 'small';
}

const Loader: React.FC<Props> = ({ size }) => {
  return (
    <ActivityIndicator
      animating={true}
      color={colors.PRIMARY}
      {...(size && { size })}
    />
  );
};

export default Loader;
