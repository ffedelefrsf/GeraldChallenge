import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { colors } from 'utils/colors';

const CustomDrawer: React.FC<any> = props => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Beka</Text>
        </View>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.flexGrow}>
          <View style={styles.listPadding}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => {}} style={styles.signOutButton}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.PURPLE },
  safeAreaContainer: { marginLeft: 10, flex: 1 },
  titleContainer: { marginTop: 50 },
  title: {
    color: colors.WHITE,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 25,
  },
  flexGrow: { flexGrow: 1 },
  listPadding: { paddingVertical: 10 },
  footer: {
    padding: 20,
    flex: 0.4,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  signOutButton: { paddingVertical: 40 },
  signOutText: {
    fontSize: 18,
    marginLeft: 5,
    color: colors.WHITE,
    fontWeight: '500',
  },
});

export default CustomDrawer;
