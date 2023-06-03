import React, { FC, useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Portal, Snackbar, Text } from 'react-native-paper';

import { ToastContext } from 'contexts/ToastContext';
import { colors } from 'utils/colors';

const Toast: FC<{}> = () => {
  const { toastData, setToastData } = useContext(ToastContext);

  useEffect(() => {
    setToastData({ visible: false });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onDismiss = useCallback(() => {
    setToastData({ ...toastData, visible: false });
  }, [toastData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Portal>
      <Snackbar
        visible={toastData.visible}
        onDismiss={onDismiss}
        duration={toastData.duration ?? 3000}
        style={[
          styles.snackbar,
          Platform.OS === 'android' && styles.elevationForAndroid,
        ]}>
        <Text style={styles.text}>{toastData.message}</Text>
      </Snackbar>
    </Portal>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    zIndex: 2000,
    backgroundColor: colors.SKY,
    borderBottomWidth: 5,
    borderBottomColor: colors.PRIMARY,
  },
  text: { color: colors.PRIMARY, fontWeight: 'bold' },
  defaultContent: { flex: 1, justifyContent: 'center', paddingLeft: 20 },
  defaultText: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.WHITE,
  },
  layoutContainer: { flex: 1 },
  crossIcon: { position: 'absolute', right: -4, top: -8, zIndex: 2 },
  marginForCross: { marginVertical: 20 },
  elevationForAndroid: { elevation: 0 },
});

export default Toast;
