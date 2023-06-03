import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeIconBottomTab: React.FC<{ color: string }> = ({ color }) => (
  <FontAwesome name="home" size={25} color={color} />
);

export default HomeIconBottomTab;
