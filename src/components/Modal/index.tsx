import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import { ModalContext } from '../../contexts/ModalContext';
import ModalContainer from './components/ModalContainer';
import ModalCloseIcon from './components/ModalCloseIcon';
import ModalTitle from './components/ModalTitle';
import ModalContent from './components/ModalContent';
import ModalActions from './components/ModalActions';
import PlatformKeyboardAvoiding from '../PlatformKeyboardAvoiding';
import { colors } from 'utils/colors';

const { height, width } = Dimensions.get('screen');

const Modal: React.FC<{}> = () => {
  const { modalData, setModalData } = useContext(ModalContext);
  const [requireScroll, setRequireScroll] = useState(false);

  useEffect(() => {
    if (!modalData.visible) {
      setRequireScroll(false);
    } else if (modalData.fullscreen) {
      setRequireScroll(true);
    }
  }, [modalData.visible, modalData.fullscreen]);

  const onDismiss = useCallback(() => {
    setModalData({ ...modalData, visible: false });
    modalData.onDismissAction && modalData.onDismissAction();
  }, [setModalData, modalData.onDismissAction]); // eslint-disable-line react-hooks/exhaustive-deps

  const onConfirm = useCallback(async () => {
    modalData.onConfirm && (await modalData.onConfirm());
    onDismiss();
  }, [modalData]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPressSecondaryButton = useCallback(() => {
    modalData.onPressSecondaryButton && modalData.onPressSecondaryButton();
    onDismiss();
  }, [onDismiss, modalData.onPressSecondaryButton]); // eslint-disable-line react-hooks/exhaustive-deps

  const withoutFlex = !requireScroll && !modalData.fullscreen;

  return modalData.visible &&
    (!modalData.fullscreen || (modalData.fullscreen && requireScroll)) ? (
    <ModalContainer
      fullscreen={modalData.fullscreen}
      requireScroll={requireScroll}
      gradientBackground={modalData.gradientBackground}
      customDialogContainerStyle={modalData.customDialogContainerStyle}
      customScreenContainerStyle={modalData.customScreenContainerStyle}
      onDismiss={onDismiss}>
      <PlatformKeyboardAvoiding
        keyboardVerticalOffset={40}
        {...(withoutFlex && { customContainerStyle: {} })}>
        <View
          {...(!withoutFlex && { style: styles.flex })}
          onLayout={event => {
            if (
              event.nativeEvent.layout.height > height * 0.75 &&
              !requireScroll
            ) {
              setRequireScroll(true);
            }
          }}>
          <ModalCloseIcon
            visible={modalData.requireDismissCross}
            onDismiss={onDismiss}
          />
          <ModalTitle
            title={modalData.title}
            customTitleStyle={modalData.customTitleStyle}
          />
          <ModalContent
            requireScroll={requireScroll}
            contentCustomStyle={modalData.contentCustomStyle}
            description={modalData.description}
            customLayout={modalData.customLayout}
            gradientBackground={modalData.gradientBackground}
          />
          <ModalActions
            customActions={modalData.customActions}
            confirmButtonText={modalData.confirmButtonText}
            onConfirm={
              (modalData.onConfirm as object | undefined)
                ? onConfirm
                : undefined
            }
            onPressSecondaryButton={onPressSecondaryButton}
            secondaryTextButtonTitle={modalData.secondaryTextButtonTitle}
            secondaryTextButtonCustomStyle={
              modalData.secondaryTextButtonCustomStyle
            }
          />
        </View>
      </PlatformKeyboardAvoiding>
    </ModalContainer>
  ) : null;
};

const styles = StyleSheet.create({
  confettiContainer: {
    height,
    width,
    zIndex: 2,
    position: 'absolute',
    top: -25,
  },
  confetti: {
    flex: 1,
    position: 'absolute',
    opacity: 0.9,
    transform: [{ scale: 1.3 }],
  },
  title: {
    fontWeight: '600',
    color: colors.BLACK,
    fontSize: 26,
    textAlign: 'center',
    paddingBottom: 0,
  },
  flex: { flex: 1 },
});

export default Modal;
