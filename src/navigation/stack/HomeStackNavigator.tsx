import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import { ROUTES } from '../enum/routes.enum';
import { MainStackParamList } from '..';
import Home from '../../screens/home';

interface Props {
  route: RouteProp<MainStackParamList, ROUTES.MAIN_HOME_STACK>;
  navigation: NativeStackNavigationProp<HomeStackParamList>;
}

export type HomeStackParamList = {
  [ROUTES.HOME_STACK]: {};
};
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC<Props> = ({}) => {
  return (
    <HomeStack.Navigator initialRouteName={ROUTES.HOME_STACK}>
      <HomeStack.Screen name={ROUTES.HOME_STACK} component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
