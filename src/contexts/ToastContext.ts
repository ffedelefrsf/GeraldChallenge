import React from 'react';

export interface ToastData {
  visible: boolean;
  message?: string;
  duration?: number;
}

export const ToastContext = React.createContext<{
  toastData: ToastData;
  setToastData: (_toastData: ToastData) => void;
  showToast: (_toastData: Omit<ToastData, 'visible'>) => void;
}>({
  toastData: {
    visible: false,
    message: '',
    duration: 3000,
  },
  setToastData: (_toastData: ToastData) => {},
  showToast: (_toastData: Omit<ToastData, 'visible'>) => {},
});
