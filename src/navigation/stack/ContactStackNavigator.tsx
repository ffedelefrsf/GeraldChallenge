import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '../enum/routes.enum';
import Contact from 'screens/contact';

interface Props {}

export type ContactStackParamList = {
  [ROUTES.CONTACT_STACK_INDEX]: {};
};
const ContactStack = createNativeStackNavigator<ContactStackParamList>();

const ContactStackNavigator: React.FC<Props> = ({}) => {
  return (
    <ContactStack.Navigator
      initialRouteName={ROUTES.CONTACT_STACK_INDEX}
      screenOptions={{ headerShown: false }}>
      <ContactStack.Screen
        name={ROUTES.CONTACT_STACK_INDEX}
        component={Contact}
      />
    </ContactStack.Navigator>
  );
};

export default ContactStackNavigator;
