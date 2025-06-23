import { View, Modal, StyleSheet, Pressable } from 'react-native'
import AppText from '@components/ui/Text'
import { Colors } from '@constants'

import { CustomModalType } from '@interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

import Ionicons from '@react-native-vector-icons/ionicons'

export default function CustomModal({
  visible = false,
  onRequestClose,
  headerText = '',
  headerIcon,
  title,
  onPressNo,
  onPressYes,
}: CustomModalType) {
  const { userTheme } = useSelector((state: RootState) => state.auth)

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (onRequestClose) {
          onRequestClose()
        }
      }}>
      <View style={styles.modalOuterWrapper}>
        <View
          style={[
            styles.modalActualWrapper,
            {
              backgroundColor:
                userTheme == 'dark' ? Colors.white : Colors.darkBlack,
            },
          ]}>
          {/* modal header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerIconWrapper}>
              {headerIcon}
              <AppText styles={{ fontSize: 14, fontFamily: 'Roboto-Medium' }}>
                {headerText}
              </AppText>
            </View>

            {/* modal close button */}
            <Pressable
              onPress={onRequestClose}
              style={styles.closeButtonWrapper}>
              <Ionicons
                name="close"
                size={20}
                color={userTheme == 'light' ? Colors.darkBlack : Colors.white}
              />
            </Pressable>
          </View>

          <View style={styles.modalBody}>
            <AppText
              styles={{
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
              }}>
              {title}
            </AppText>

            <AppText
              styles={{
                fontSize: 13,
                fontFamily: 'Roboto-Regular',
              }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
              faci hasina?!
            </AppText>
          </View>

          <View
            style={{
              width: '100%',
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Pressable onPress={onPressNo} style={styles.noButton}>
              <AppText styles={{ fontFamily: 'Poppins-Bold' }}>No</AppText>
            </Pressable>
            <Pressable onPress={onPressYes} style={styles.yesButton}>
              <AppText styles={{ fontFamily: 'Poppins-Bold' }}>Yes</AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalActualWrapper: {
    height: 280,
    width: 280,
    alignItems: 'center',
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalOuterWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalHeader: {
    height: 40,
    width: '100%',
    // backgroundColor: 'red',
    paddingLeft: 25,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButtonWrapper: {
    height: 40,
    width: 40,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    gap: 10,
    alignItems: 'center',
  },
  modalBody: {
    paddingTop: 10,
    width: '100%',
    // backgroundColor: 'red',
    gap: 20,
    paddingLeft: 25,
    paddingRight: 15,
    height: '50%',
  },
  noButton: {
    height: 40,
    width: '35%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.socialPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    height: 40,
    width: '35%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.socialPink,
    backgroundColor: Colors.socialPink,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
