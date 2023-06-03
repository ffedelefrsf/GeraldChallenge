import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface ModalData {
  visible: boolean;
  description?: string;
  title?: string | React.ReactNode;
  onConfirm?: () => Promise<void> | void;
  confirmButtonText?: string;
  customLayout?: React.ReactNode;
  onDismissAction?: () => void;
  onPressUpload?: () => void;
  customActions?: React.ReactNode;
  secondaryTextButtonTitle?: string;
  onPressSecondaryButton?: () => void;
  requireDismissCross?: boolean;
  fullscreen?: boolean;
  contentCustomStyle?: ViewStyle;
  customTitleStyle?: TextStyle;
  secondaryTextButtonCustomStyle?: TextStyle;
  customDialogContainerStyle?: ViewStyle;
  customScreenContainerStyle?: ViewStyle;
  gradientBackground?: boolean;
}

export const ModalContext = React.createContext<{
  modalData: ModalData;
  setModalData: (_modalData: ModalData) => void;
}>({
  modalData: {
    visible: false,
    description: '',
    title: '',
    confirmButtonText: '',
    onConfirm: () => {},
    customLayout: undefined,
    onDismissAction: () => {},
    onPressSecondaryButton: () => {},
    secondaryTextButtonTitle: '',
    customActions: undefined,
    requireDismissCross: false,
    fullscreen: false,
    onPressUpload: () => {},
    contentCustomStyle: undefined,
    customTitleStyle: undefined,
    secondaryTextButtonCustomStyle: undefined,
    customDialogContainerStyle: undefined,
    customScreenContainerStyle: undefined,
    gradientBackground: false,
  },
  setModalData: (_modalData: ModalData) => {},
});
