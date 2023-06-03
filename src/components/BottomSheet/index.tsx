import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import { colors } from 'utils/colors';

interface Props {
  content: React.ReactNode;
  footer?: React.ReactNode;
  name?: string;
  onDismiss?: () => any;
  heightPercentage?: string;
}

export interface BottomSheetRef {
  handlePresentModalPress: () => void;
  handleDismissModalPress: () => void;
}

const BackdropComponent = React.memo(
  ({ animatedIndex, animatedPosition, style }: BottomSheetBackdropProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      }).start();
      return () => {
        fadeAnim.setValue(0);
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <Animated.View
        style={[
          style,
          {
            backgroundColor: colors.BLACK,
            opacity: fadeAnim,
          },
        ]}>
        <BottomSheetBackdrop
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
        />
      </Animated.View>
    );
  },
);

const BottomSheetComponent: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<unknown>
> = React.forwardRef(
  (
    { content, footer, name: bottomSheetName, onDismiss, heightPercentage },
    ref,
  ) => {
    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const snapPoints = React.useMemo(
      () => ['15%', heightPercentage ? heightPercentage : '90%'],
      [heightPercentage],
    );

    const handlePresentModalPress = React.useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleDismissModalPress = React.useCallback(() => {
      bottomSheetModalRef.current?.dismiss();
    }, []);

    const handleSheetChanges = React.useCallback((_index: number) => {
      // console.log('handleSheetChanges', index);
    }, []);

    const renderFooter = React.useCallback(
      (props: any) => (
        <BottomSheetFooter {...props} bottomInset={24}>
          <View>{footer}</View>
        </BottomSheetFooter>
      ),
      [footer],
    );

    React.useImperativeHandle(ref, () => ({
      handlePresentModalPress,
      handleDismissModalPress,
    }));

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BackdropComponent}
        onChange={handleSheetChanges}
        onDismiss={onDismiss}
        {...(footer && { footerComponent: renderFooter })}
        {...(bottomSheetName && { name: bottomSheetName })}>
        <BottomSheetScrollView style={styles.contentContainer}>
          <View style={styles.contentContainerView}>{content}</View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  contentContainerView: { alignItems: 'center' },
});

export default BottomSheetComponent;
