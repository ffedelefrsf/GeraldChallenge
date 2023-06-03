import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import { colors } from 'utils/colors';

export interface BottomSheetItem {
  icon: React.ReactNode;
  title: string;
  action: (...args: any) => any;
  customTitleStyle?: TextStyle;
}

interface Props {
  items: BottomSheetItem[];
  customContainerStyle?: ViewStyle;
}

const BottomSheetContent: React.FC<Props> = ({
  items,
  customContainerStyle,
}) => {
  return (
    <View style={[styles.createOptionsWrapper, customContainerStyle]}>
      {items.map(item => (
        <TouchableOpacity
          key={item.title}
          style={styles.optionContent}
          onPress={item.action}>
          <View style={styles.optionIconContent}>{item.icon}</View>
          <Text style={[styles.optionTitle, item.customTitleStyle]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  createOptionsWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  optionContent: { flexDirection: 'row', marginVertical: 10 },
  optionIconContent: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 14,
    color: colors.PRIMARY,
    paddingLeft: 10,
  },
});

export default React.memo(BottomSheetContent);
