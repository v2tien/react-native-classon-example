import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { bookData } from '../common/bookdata2';
import { useNavigation } from '@react-navigation/native';
import { PlayProps } from '../common/classroom';

export function ClassItem() {
  const navigation = useNavigation<any>();

  const onPress = () => {
    const data: PlayProps = {
      bookData,
      hasSocket: false,
      isTeacher: false,
      token: 'bearer teacher2',
      classId: 1001,
    };
    navigation.navigate('Classroom', { data });
  };

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.txtName}>Lesson name</Text>
      <Text style={styles.txtDesc}>Description lesson</Text>
      <Text style={styles.txtDesc}>Level: Elementary</Text>
    </TouchableOpacity>
  );
}
