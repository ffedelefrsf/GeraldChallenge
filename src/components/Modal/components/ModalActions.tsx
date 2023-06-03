import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { t } from 'i18next';

import PrimaryButton from 'components/PrimaryButton';
import { colors } from 'utils/colors';

interface Props {
  customActions?: React.ReactNode;
  confirmButtonText?: string;
  secondaryTextButtonTitle?: string;
  secondaryTextButtonCustomStyle?: TextStyle;
  onConfirm?: () => void;
  onPressSecondaryButton?: () => void;
}

const ModalActions: React.FC<Props> = ({
  customActions,
  confirmButtonText,
  secondaryTextButtonTitle,
  secondaryTextButtonCustomStyle,
  onConfirm,
  onPressSecondaryButton,
}) => {
  return customActions || onConfirm ? (
    <View style={styles.actionsContainer}>
      {customActions ??
        (onConfirm && (
          <View style={styles.buttonContainer}>
            <PrimaryButton
              customLabelStyle={styles.actionButtontext}
              customButtonStyle={styles.customButtonStyle}
              onPress={onConfirm}
              label={confirmButtonText || t('CONFIRM')}
              verticalLinear
            />
            {secondaryTextButtonTitle && (
              <TouchableOpacity
                style={styles.buttonTextWrapper}
                onPress={onPressSecondaryButton}>
                <Text
                  style={[styles.buttonText, secondaryTextButtonCustomStyle]}>
                  {secondaryTextButtonTitle}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  actionsContainer: { marginBottom: 20 },
  buttonContainer: { marginTop: 10, paddingHorizontal: 25 },
  actionButtontext: {
    color: colors.WHITE,
    fontWeight: '600',
  },
  customButtonStyle: { flex: 0 },
  buttonTextWrapper: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.LIGHT_GREY,
    textDecorationLine: 'underline',
    fontSize: 10,
  },
});

export default React.memo(ModalActions);
