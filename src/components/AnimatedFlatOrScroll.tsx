import React, { RefAttributes, useMemo } from 'react';
import {
  FlatListProps,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { colors } from 'utils/colors';

interface Props {
  flatList?: any;
  containerStyle?: ViewStyle;
  flatListProps?: FlatListProps<any> & RefAttributes<Animated.FlatList<any>>;
  parentBackgroundTopHexColor?: string;
  parentBackgroundBottomHexColor?: string;
  scrollViewProps?: ScrollViewProps & RefAttributes<Animated.ScrollView>;
  children?: any;
  shadowOffset?: number;
  customEdgeStyle?: ViewStyle;
}

const FADE_MIN_OPACITIY = 0;
const FADE_MAX_OPACITIY = 1;

const AnimatedFlatOrScroll: React.FC<Props> = ({
  flatList,
  containerStyle,
  flatListProps,
  parentBackgroundTopHexColor = colors.WHITE,
  parentBackgroundBottomHexColor = colors.WHITE,
  scrollViewProps,
  children,
  shadowOffset = 10,
  customEdgeStyle,
}) => {
  const scrollY = useSharedValue(0);
  const backgroundTopColorAlpha1 = useMemo(
    () =>
      `${parentBackgroundTopHexColor}${Math.floor(FADE_MAX_OPACITIY * 255)
        .toString(16)
        .padStart(2, '0')}`,
    [parentBackgroundTopHexColor],
  );
  const backgroundTopColorAlpha0 = useMemo(
    () =>
      `${parentBackgroundTopHexColor}${Math.floor(FADE_MIN_OPACITIY * 255)
        .toString(16)
        .padStart(2, '0')}`,
    [parentBackgroundTopHexColor],
  );
  const backgroundBottomColorAlpha1 = useMemo(
    () =>
      `${parentBackgroundBottomHexColor}${Math.floor(FADE_MAX_OPACITIY * 255)
        .toString(16)
        .padStart(2, '0')}`,
    [parentBackgroundBottomHexColor],
  );
  const backgroundBottomColorAlpha0 = useMemo(
    () =>
      `${parentBackgroundBottomHexColor}${Math.floor(FADE_MIN_OPACITIY * 255)
        .toString(16)
        .padStart(2, '0')}`,
    [parentBackgroundBottomHexColor],
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const opacityEdgeFade = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [-shadowOffset, 0, shadowOffset],
      [1, 0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          opacityEdgeFade,
          styles.edges,
          styles.header,
          ((flatList && flatListProps?.scrollEnabled === false) ||
            (!flatList && scrollViewProps?.scrollEnabled === false)) &&
            styles.hideEdges,
          customEdgeStyle,
        ]}>
        <LinearGradient
          style={{ height: customEdgeStyle?.height ?? styles.edges.height }}
          colors={[backgroundTopColorAlpha1, backgroundTopColorAlpha0]}
        />
      </Animated.View>
      {flatList && flatListProps ? (
        <Animated.FlatList
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          {...flatListProps}
          contentContainerStyle={[
            styles.defaultPadding,
            flatListProps && flatListProps.contentContainerStyle,
          ]}>
          {children}
        </Animated.FlatList>
      ) : (
        <Animated.ScrollView
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          {...scrollViewProps}
          contentContainerStyle={[
            styles.defaultPadding,
            scrollViewProps && scrollViewProps.contentContainerStyle,
          ]}
          scrollEventThrottle={1}>
          {children}
        </Animated.ScrollView>
      )}
      <Animated.View
        style={[
          opacityEdgeFade,
          styles.edges,
          styles.footer,
          ((flatList && flatListProps?.scrollEnabled === false) ||
            (!flatList && scrollViewProps?.scrollEnabled === false)) &&
            styles.hideEdges,
          customEdgeStyle,
        ]}>
        <LinearGradient
          style={{ height: customEdgeStyle?.height ?? styles.edges.height }}
          colors={[backgroundBottomColorAlpha0, backgroundBottomColorAlpha1]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  edges: {
    position: 'absolute',
    height: 20,
    width: '100%',
    zIndex: 2,
  },
  header: { top: 0 },
  footer: { bottom: 0 },
  defaultPadding: { paddingBottom: 15 },
  hideEdges: { display: 'none' },
});

export default React.memo(AnimatedFlatOrScroll);
