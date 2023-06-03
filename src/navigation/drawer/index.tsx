import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ROUTES } from 'navigation/enum/routes.enum';
import CustomDrawer from './CustomDrawer';
import { colors } from 'utils/colors';
import BottomTabNavigator from 'navigation/bottomtabs';
import { StyleSheet } from 'react-native';

export type DrawerParamList = {
  [ROUTES.DRAWER_BOTTOM]: {};
  [ROUTES.DRAWER_START]: {};
  [ROUTES.DRAWER_CART]: {};
  [ROUTES.DRAWER_FAVOURITES]: {};
  [ROUTES.DRAWER_ORDERS]: {};
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const DrawerNavigator: React.FC<{}> = ({}) => {
  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.DRAWER_START}
      drawerContent={CustomDrawer}
      screenOptions={{
        drawerActiveBackgroundColor: colors.LIGHTER_RED,
        drawerActiveTintColor: colors.LIGHT_RED,
        drawerInactiveTintColor: colors.WHITE,
        drawerLabelStyle: styles.label,
        headerShown: false,
      }}>
      <Drawer.Screen
        name={ROUTES.DRAWER_START}
        component={BottomTabNavigator}
      />
      <Drawer.Screen name={ROUTES.DRAWER_CART} component={BottomTabNavigator} />
      <Drawer.Screen
        name={ROUTES.DRAWER_FAVOURITES}
        component={BottomTabNavigator}
      />
      <Drawer.Screen
        name={ROUTES.DRAWER_ORDERS}
        component={BottomTabNavigator}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default DrawerNavigator;
