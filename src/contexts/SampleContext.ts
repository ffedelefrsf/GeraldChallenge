import React from 'react';
import { ViewStyle } from 'react-native';

export interface SampleData {
  visible: boolean;
  title?: string | React.ReactNode;
  description?: string;
  onConfirm?: () => Promise<void> | void;
  contentCustomStyle?: ViewStyle;
}

export const SampleContext = React.createContext({
  sampleData: {
    visible: false,
    title: '',
    description: '',
    onConfirm: () => {},
    contentCustomStyle: undefined,
  },
  setSampleData: (_sampleData: SampleData) => {},
});
