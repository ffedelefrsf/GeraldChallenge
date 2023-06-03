import { TextStyle } from 'react-native/types';

import { colors } from './colors';

export const commonViewStyles = {
  shadow: (opacity: number) => ({
    elevation: opacity,
    shadowColor: colors.BLACK,
    shadowOpacity: opacity / 100,
    shadowRadius: 10,
    shadowOffset: { width: -2, height: 8 },
  }),
  flex: { flex: 1 },
  container: {
    flex: 1,
    margin: 10,
  },
};

export const commonTextStyles: {
  [styleName: string]: TextStyle | ((...args: any) => TextStyle);
} = {};
