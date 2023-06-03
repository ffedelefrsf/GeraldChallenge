import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PrimaryButton from 'components/PrimaryButton';
import { ROUTES } from 'navigation/enum/routes.enum';
import { colors } from 'utils/colors';
import { HomeStackParamList } from 'navigation/stack/HomeStackNavigator';
import TitleText from 'components/TitleText';

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
      <TitleText customStyle={styles.text}>Screen 2!</TitleText>
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
  text: { color: colors.BLACK, marginVertical: 20 },
});

export default Screen2;
