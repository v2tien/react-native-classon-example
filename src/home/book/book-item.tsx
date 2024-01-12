import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Book } from '../../types/book';
import { styles } from '../styles';

export function BookItem(props: { item: Book; onPress: () => void }) {
  const { item } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.item}
      onPress={props.onPress}>
      <FastImage
        source={{ uri: item.thumbnail ?? '' }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <Text style={styles.txtName}>{item.title}</Text>
      <Text style={styles.txtDesc}>{item.desc}</Text>
    </TouchableOpacity>
  );
}
