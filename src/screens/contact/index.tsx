import React from 'react';
import { StyleSheet, View } from 'react-native';

import TitleText from 'components/TitleText';
import { colors } from 'utils/colors';

interface Props {}

const Contact: React.FC<Props> = ({}) => {
  return (
    <View>
      <TitleText customStyle={styles.text}>Contact!</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { color: colors.BLACK, marginVertical: 20 },
});
export default Contact;
