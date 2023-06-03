import React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { Headline } from 'react-native-paper';

interface Props {
  children: any;
  customStyle?: TextStyle;
}

const TitleText: React.FC<Props> = ({ children, customStyle }) => {
  return <Headline style={[styles.title, customStyle]}>{children}</Headline>;
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default React.memo(TitleText);
