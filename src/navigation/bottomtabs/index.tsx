import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  DrawerNavigationProp,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { ROUTES } from 'navigation/enum/routes.enum';
import { commonViewStyles } from 'utils/commonStyles';
import { colors } from 'utils/colors';
import HomeStackNavigator from 'navigation/stack/HomeStackNavigator';
import ContactStackNavigator from 'navigation/stack/ContactStackNavigator';
import BackgroundShadowAndroid from './BackgroundShadowAndroid';
import HomeIconBottomTab from './icons/home';
import ContactIconBottomTab from './icons/contact';

interface Props {
  navigation: DrawerNavigationProp<any>;
}

const BOTTOM_TAB_HEIGHT = 60;

interface TabDetail {
  name: ROUTES.HOME_BOTTOM_TAB | ROUTES.CONTACT_BOTTOM_TAB;
  component: React.FC;
  options: () => BottomTabNavigationOptions;
}

export type BottomTabParamList = {
  [ROUTES.HOME_BOTTOM_TAB]: {};
  [ROUTES.CONTACT_BOTTOM_TAB]: {};
};
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC<Props> = ({ navigation }) => {
  const drawerProgress = useDrawerProgress();

  const homePageStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(drawerProgress.value, [0, 1], [0, -5]);
    return {
      transform: [{ rotate: interpolation + 'deg' }],
    };
  });

  const handleBackground = (bottomBarHeight: number, shadowOpacity: number) => {
    if (Platform.OS === 'android') {
      return (
        <BackgroundShadowAndroid
          bottomBarHeight={bottomBarHeight}
          shadowOpacity={shadowOpacity}
        />
      );
    } else {
      return false;
    }
  };

  const Tabs: TabDetail[] = [
    {
      name: ROUTES.HOME_BOTTOM_TAB,
      component: HomeStackNavigator,
      options: () => ({
        tabBarIcon: HomeIconBottomTab,
      }),
    },
    {
      name: ROUTES.CONTACT_BOTTOM_TAB,
      component: ContactStackNavigator,
      options: () => ({
        tabBarIcon: ContactIconBottomTab,
      }),
    },
  ];

  const handleOpenDrawer = () => {
    navigation.toggleDrawer();
  };

  const simulatedDrawerIcon = () => (
    <SimpleLineIcons
      name="menu"
      color={colors.LIGHTER_GREY}
      size={20}
      onPress={handleOpenDrawer}
    />
  );

  return (
    <Animated.View style={[styles.container, homePageStyle]}>
      <SafeAreaView style={commonViewStyles.container}>
        {/* DRAWER HEADER SIMULATOR */}
        <View style={styles.headerContainer}>
          <IconButton icon={simulatedDrawerIcon} />
          <Text style={styles.headerTitle}>
            {ROUTES.DRAWER_START.toUpperCase()}
          </Text>
        </View>
        {/* END DRAWER HEADER SIMULATOR */}
        <Tab.Navigator
          initialRouteName={ROUTES.HOME_BOTTOM_TAB}
          backBehavior="none"
          screenOptions={{
            tabBarItemStyle: {
              height: BOTTOM_TAB_HEIGHT,
              paddingTop: 15,
            },
            tabBarStyle: [
              styles.tabBarStyle,
              { height: BOTTOM_TAB_HEIGHT },
              Platform.select({
                ios: {
                  ...commonViewStyles.shadow(6),
                  shadowOffset: { width: 0, height: -30 },
                },
                android: {
                  elevation: 25,
                  paddingBottom: 70,
                },
              }),
            ],
            unmountOnBlur: true,
            headerShown: false,
            tabBarActiveTintColor: colors.LIGHT_RED,
            tabBarBackground: () =>
              handleBackground(BOTTOM_TAB_HEIGHT + 10, 0.075),
          }}>
          {Tabs.map((item: TabDetail, idx: number) => {
            return (
              <Tab.Screen
                key={idx}
                name={item.name}
                component={item.component}
                options={() => ({
                  ...item.options(),
                })}
                listeners={({ route }: { route: any }) => ({
                  tabPress: _e => {
                    route.params &&
                      Object.keys(route.params).forEach(param => {
                        route.params && delete route.params[param];
                      });
                  },
                })}
              />
            );
          })}
        </Tab.Navigator>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 100,
  },
  tabBarStyle: {
    paddingHorizontal: 40,
    backgroundColor: colors.WHITE,
    borderTopWidth: 0,
  },
  headerContainer: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: {
    color: colors.LIGHT_GREY,
    fontSize: 20,
    letterSpacing: 3,
  },
});

export default BottomTabNavigator;
