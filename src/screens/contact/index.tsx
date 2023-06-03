import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { colors } from 'utils/colors';

interface Props {}

const Contact: React.FC<Props> = ({}) => {
  return (
    <View>
      <Text style={styles.text}>Contact!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { color: colors.BLACK },
});
export default Contact;
