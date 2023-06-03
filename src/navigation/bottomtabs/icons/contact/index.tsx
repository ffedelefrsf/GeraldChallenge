import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ContactIconBottomTab: React.FC<{ color: string }> = ({ color }) => (
  <FontAwesome size={20} name="users" color={color} />
);

export default ContactIconBottomTab;
