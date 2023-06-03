import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '../enum/routes.enum';
import Screen1 from 'screens/screen1';
import Screen2 from 'screens/screen2';

interface Props {}

export type HomeStackParamList = {
  [ROUTES.HOME_STACK_SCREEN1]: undefined;
  [ROUTES.HOME_STACK_SCREEN2]: undefined;
};
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC<Props> = ({}) => {
  return (
    <HomeStack.Navigator
      initialRouteName={ROUTES.HOME_STACK_SCREEN1}
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name={ROUTES.HOME_STACK_SCREEN1} component={Screen1} />
      <HomeStack.Screen name={ROUTES.HOME_STACK_SCREEN2} component={Screen2} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
