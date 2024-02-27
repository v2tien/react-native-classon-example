import React from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { PlayProps } from '../../common/classroom';
import FastImage from 'react-native-fast-image';
import { Class, Participation } from '../../types/class';
import { IMG_DEFAULT } from '../../common/constants';

export function ClassItem(props: { item: Class }) {
  const { item } = props;
  const navigation = useNavigation<any>();

  const teacher = !Array.isArray(item.participations)
    ? item.participations.TEACHER
    : [];

  const students = !Array.isArray(item.participations)
    ? item.participations.STUDENT
    : [];

  const onPress = () => {
    if (teacher.length === 0) {
      Alert.alert('Message', 'Lớp học chưa có giáo viên!');
      return;
    }
    if (students.length === 0) {
      Alert.alert('Message', 'Lớp học chưa có học sinh!');
      return;
    }

    if (!Array.isArray(item.participations)) {
      const myTeacher = teacher.find(
        (e: Participation) => e.linked_user.id === global.user.user.id,
      );

      const myStudent = students.find(
        (e: Participation) => e.linked_user.id === global.user.user.id,
      );

      if (!myTeacher && !myStudent) {
        Alert.alert('Message', 'Bạn không có trong lớp học này!');
        return;
      }

      const data: PlayProps = {
        live: true,
        token: `Bearer ${global.token}`,
        classId: item.id,
        // roleId: findRole.role_id,
        user: {
          id: global.user.user.id,
          role: myTeacher ? 'TEACHER' : 'STUDENT',
          fullname: global.user.user.username,
        },
      };
      navigation.navigate('Classroom', { data });
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={onPress}>
      <FastImage
        source={{ uri: item.book_lessons?.thumbnail ?? IMG_DEFAULT }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <Text style={styles.txtName}>{item.book_lessons?.title}</Text>
      <Text style={styles.txtDesc}>Level: {item.book_levels?.title}</Text>
      <Text style={styles.txtDesc}>
        Teacher:{' '}
        {(teacher?.length > 0 && teacher[0].linked_user.username) ?? ''}
      </Text>
      <Text style={styles.txtDesc}>
        Students ({students?.length}):{' '}
        {students?.length > 0 &&
          students?.map((s: Participation, i: number) => (
            <Text key={s.linked_user.id}>
              {s.linked_user?.username ?? ''}
              {i === students.length - 1 ? '' : ', '}
            </Text>
          ))}
      </Text>
    </TouchableOpacity>
  );
}
