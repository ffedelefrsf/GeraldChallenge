import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ROUTES } from 'navigation/enum/routes.enum';
import PrimaryButton from 'components/PrimaryButton';
import { colors } from 'utils/colors';
import { HomeStackParamList } from 'navigation/stack/HomeStackNavigator';

interface Props {
  navigation: NativeStackNavigationProp<
    HomeStackParamList,
    ROUTES.HOME_STACK_SCREEN1
  >;
}

const Screen1: React.FC<Props> = ({ navigation }) => {
  const handleNavigatePress = () => {
    navigation.replace(ROUTES.HOME_STACK_SCREEN2);
  };

  return (
    <View>
      <Text style={styles.text}>Screen 1!</Text>
      <PrimaryButton
        onPress={handleNavigatePress}
        label={'Navigate to Screen 2 >'}
        customContainerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  text: { color: colors.BLACK },
});

export default Screen1;
