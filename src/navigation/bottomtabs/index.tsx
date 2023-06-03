import React from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  DrawerNavigationProp,
  useDrawerProgress,
  useDrawerStatus,
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

const { width } = Dimensions.get('screen');
const BottomTabNavigator: React.FC<Props> = ({ navigation }) => {
  const drawerProgress = useDrawerProgress();
  const drawerStatus = useDrawerStatus();

  const homePageStyle = useAnimatedStyle(() => {
    const interpolateDegrees = interpolate(
      drawerProgress.value,
      [0, 1],
      [0, -3],
    );
    const interpolateTranslateX = interpolate(
      drawerProgress.value,
      [0, 1],
      [0, Platform.OS === 'android' ? width * 0.55 : 50],
    );
    const interpolateTranslateY = interpolate(
      drawerProgress.value,
      [0, 1],
      [0, 50],
    );
    const interpolateBorder = interpolate(
      drawerProgress.value,
      [0, 1],
      [0, 30],
    );
    return {
      transform: [
        { rotate: interpolateDegrees + 'deg' },
        { translateX: interpolateTranslateX },
        { translateY: interpolateTranslateY },
      ],
      borderTopLeftRadius: interpolateBorder,
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

  return (
    <View
      style={[
        commonViewStyles.flex,
        drawerStatus !== 'closed' && styles.background,
      ]}>
      <Animated.View style={[styles.container, homePageStyle]}>
        <SafeAreaView style={commonViewStyles.flex}>
          {/* DRAWER HEADER SIMULATOR */}
          <SafeAreaView style={styles.headerContainer}>
            <TouchableOpacity
              onPress={handleOpenDrawer}
              style={styles.menuDrawer}>
              <SimpleLineIcons
                name="menu"
                color={colors.LIGHTER_GREY}
                size={20}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {ROUTES.DRAWER_START.toUpperCase()}
            </Text>
          </SafeAreaView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  background: { backgroundColor: colors.PURPLE },
  tabBarStyle: {
    paddingHorizontal: 40,
    backgroundColor: colors.WHITE,
    borderTopWidth: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    color: colors.LIGHT_GREY,
    fontSize: 20,
    letterSpacing: 4,
    marginLeft: 10,
  },
  menuDrawer: {
    marginLeft: 20,
    marginRight: 10,
  },
});

export default BottomTabNavigator;
