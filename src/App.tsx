import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/src/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import Navigation from './navigation';
import { commonViewStyles } from './utils/commonStyles';
import { colors } from './utils/colors';
import configureStore from './store';
import i18n from '../i18n';

const store = configureStore();
const queryClient = new QueryClient();

export const lightTheme: ThemeProp = {
  ...DefaultTheme,
  roundness: 2,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.PRIMARY,
    onSurface: colors.WHITE,
  },
};

const App: React.FC<{}> = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#ccc' : '#fff',
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={commonViewStyles.flex}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <I18nextProvider i18n={i18n}>
              <PaperProvider theme={lightTheme}>
                <BottomSheetModalProvider>
                  <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={backgroundStyle.backgroundColor}
                  />
                  <Navigation />
                </BottomSheetModalProvider>
              </PaperProvider>
            </I18nextProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
