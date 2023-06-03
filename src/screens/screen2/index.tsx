import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PrimaryButton from 'components/PrimaryButton';
import { ROUTES } from 'navigation/enum/routes.enum';
import { colors } from 'utils/colors';
import { HomeStackParamList } from 'navigation/stack/HomeStackNavigator';

interface Props {
  navigation: NativeStackNavigationProp<
    HomeStackParamList,
    ROUTES.HOME_STACK_SCREEN2
  >;
}

const Screen2: React.FC<Props> = ({ navigation }) => {
  const handleNavigatePress = () => {
    navigation.replace(ROUTES.HOME_STACK_SCREEN1);
  };

  return (
    <View>
      <Text style={styles.text}>Screen 2!</Text>
      <PrimaryButton
        onPress={handleNavigatePress}
        label={'< Navigate to Screen 1'}
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

export default Screen2;
