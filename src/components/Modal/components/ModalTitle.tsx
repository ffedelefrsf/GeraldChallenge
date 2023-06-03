import React from 'react';
import { TextStyle } from 'react-native';

import TitleText from 'components/TitleText';

interface Props {
  title: string | React.ReactNode;
  customTitleStyle?: TextStyle;
}

const ModalTitle: React.FC<Props> = ({ title, customTitleStyle }) => {
  return title ? (
    typeof title !== 'object' ? (
      <TitleText customStyle={customTitleStyle}>{title}</TitleText>
    ) : (
      <>{title}</>
    )
  ) : null;
};

export default React.memo(ModalTitle);
