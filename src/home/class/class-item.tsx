import React from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { useNavigation } from '@react-navigation/native';
import { PlayProps } from '../../common/classroom';
import FastImage from 'react-native-fast-image';
import { Class, Participation } from '../../types/class';

export function ClassItem(props: { item: Class }) {
  const { item } = props;
  const navigation = useNavigation<any>();

  const teacher = item.participations.find(
    (i: any) => i.class_roles.code === 'TEACHER',
  );

  const students = item.participations.filter(
    (i: any) => i.class_roles.code === 'STUDENT',
  );

  const onPress = () => {
    if (item.participations.length > 1) {
      const myInfo = item.participations.find(
        (e: Participation) => e.linked_user_id === global.user.user.id,
      );

      if (!myInfo) {
        Alert.alert('Message', 'Bạn không có trong lớp học này!');
        return;
      }

      // const findRole: UserRole = global.user.partner.user_roles.find(
      //   (r: UserRole) => r.user_id === myInfo.linked_user_id,
      // );

      // if (!findRole) {
      //   return;
      // }

      const data: PlayProps = {
        live: true,
        token: `Bearer ${global.token}`,
        classId: item.id,
        // roleId: findRole.role_id,
        user: {
          id: myInfo.linked_user_id,
          role: myInfo.class_roles?.code,
          fullname: global.user.user.username,
        },
      };
      navigation.navigate('Classroom', { data });
    } else {
      if (!teacher) {
        Alert.alert('Message', 'Lớp học chưa có giáo viên!');
        return;
      }
      if (students.length === 0) {
        Alert.alert('Message', 'Lớp học chưa có học sinh!');
        return;
      }
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.item} onPress={onPress}>
      <FastImage
        source={{ uri: item.book_lessons?.thumbnail ?? '' }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <Text style={styles.txtName}>{item.book_lessons?.title}</Text>
      <Text style={styles.txtDesc}>Level: {item.book_levels?.title}</Text>
      <Text style={styles.txtDesc}>
        Teacher: {teacher?.linked_user?.username ?? ''}
      </Text>
      <Text style={styles.txtDesc}>
        Students ({students.length}):{' '}
        {students.map((s: Participation, i: number) => (
          <Text key={s.linked_user.id}>
            {s.linked_user?.username ?? ''}
            {i === students.length - 1 ? '' : ', '}
          </Text>
        ))}
      </Text>
    </TouchableOpacity>
  );
}
