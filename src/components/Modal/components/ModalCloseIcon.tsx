import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import CrossIcon from 'assets/icons/CrossIcon';

interface Props {
  visible: boolean | undefined;
  onDismiss: () => void;
}

const ModalCloseIcon: React.FC<Props> = ({ visible, onDismiss }) => {
  return visible ? (
    <View style={styles.crossIconContent}>
      <TouchableOpacity onPress={onDismiss}>
        <CrossIcon />
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  crossIconContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: 5,
  },
});

export default React.memo(ModalCloseIcon);
