import React from 'react';
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function BackButton(props: { styles?: ViewStyle; onBack?: () => void }) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={[styles.btnBack, props.styles]}
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
  btnBack: {
    padding: 10,
    marginStart: 10,
    // position: 'absolute',
    // top: 10,
    // left: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
