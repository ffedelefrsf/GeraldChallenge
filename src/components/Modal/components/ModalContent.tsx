import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import AnimatedFlatOrScroll from '../../AnimatedFlatOrScroll';
import { colors } from 'utils/colors';

interface Props {
  requireScroll: boolean;
  description?: string;
  contentCustomStyle?: ViewStyle;
  customLayout?: React.ReactNode;
  gradientBackground?: boolean;
}

const AddScrollIfAsked = ({
  scrollRequired,
  children,
  gradientBackground,
}: {
  scrollRequired: boolean;
  children: React.ReactElement;
  gradientBackground?: boolean;
}) => {
  return scrollRequired ? (
    <AnimatedFlatOrScroll
      flatList={false}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        contentContainerStyle: styles.flexGrow,
        style: { flex: 1 },
      }}
      {...(gradientBackground && {
        parentBackgroundBottomHexColor: colors.SKY,
      })}
      shadowOffset={2}>
      {children}
    </AnimatedFlatOrScroll>
  ) : (
    children
  );
};

const ModalContent: React.FC<Props> = ({
  requireScroll,
  contentCustomStyle,
  description,
  customLayout,
  gradientBackground,
}) => {
  return (
    <AddScrollIfAsked
      scrollRequired={requireScroll}
      gradientBackground={gradientBackground}>
      <View
        {...(contentCustomStyle && { style: contentCustomStyle })}
        onStartShouldSetResponder={() => true}>
        {description && <Text style={styles.bodyText}>{description}</Text>}
        {customLayout}
      </View>
    </AddScrollIfAsked>
  );
};

const styles = StyleSheet.create({
  bodyText: {
    color: colors.LIGHT_GREY,
    fontSize: 12,
    marginBottom: 10,
  },
  flexGrow: { flexGrow: 1 },
});

export default React.memo(ModalContent);
