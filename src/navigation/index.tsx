import React, { useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeStackNavigator from './stack/HomeStackNavigator';
import { ROUTES } from './enum/routes.enum';
import { colors } from 'utils/colors';
import PlatformKeyboardAvoiding from 'components/PlatformKeyboardAvoiding';
import { ModalContext, ModalData } from 'contexts/ModalContext';
import Modal from 'components/Modal';
import Toast from 'components/Toast';
import { ToastContext, ToastData } from 'contexts/ToastContext';

export type MainStackParamList = {
  [ROUTES.MAIN_HOME_STACK]: {};
};
const MainStack = createNativeStackNavigator<MainStackParamList>();

const Navigation: React.FC<{}> = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.BLACK : colors.WHITE,
  };

  const navigationTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.WHITE,
    },
  };

  const [modalData, setModalData] = useState<ModalData>({
    visible: false,
  });

  const [toastData, setToastData] = useState<ToastData>({
    visible: false,
  });
  const showToast = ({ message, duration }: Omit<ToastData, 'visible'>) => {
    setToastData({
      visible: true,
      message,
      duration,
    });
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ToastContext.Provider value={{ toastData, setToastData, showToast }}>
        <ModalContext.Provider value={{ modalData, setModalData }}>
          <Modal />
          <Toast />
          <PlatformKeyboardAvoiding>
            <MainStack.Navigator
              initialRouteName={ROUTES.MAIN_HOME_STACK}
              screenOptions={{
                headerShown: false,
              }}>
              <MainStack.Screen
                name={ROUTES.MAIN_HOME_STACK}
                component={HomeStackNavigator}
              />
            </MainStack.Navigator>
          </PlatformKeyboardAvoiding>
        </ModalContext.Provider>
      </ToastContext.Provider>
    </NavigationContainer>
  );
};

export default Navigation;
