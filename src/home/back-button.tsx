import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function BackButton(props: { onBack?: () => void }) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.btnLogout}
      onPress={() => (props.onBack ? props.onBack() : navigation.goBack())}>
      <Image
        source={require('../image/back-button.png')}
        resizeMode="contain"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnLogout: {
    padding: 10,
    marginStart: 10,
    // position: 'absolute',
    // top: 10,
    // left: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
