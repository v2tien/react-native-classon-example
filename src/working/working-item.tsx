import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Partner } from '../types/partner';
import { UserRole } from '../types/role';

export function WorkingItem(props: {
  item: Partner;
  selectWorking: () => void;
}) {
  const { item, selectWorking } = props;

  return (
    <TouchableOpacity style={styles.vItem} onPress={selectWorking}>
      <Text style={styles.txtName}>
        {item.title} ({item.code})
      </Text>
      <Text style={styles.txtDesc}>{item.domain}</Text>

      {item.user_roles.map((e: UserRole, i: number) => {
        return (
          <Text key={e.id} style={[styles.txtDesc, { fontWeight: '500' }]}>
            {e.roles.title}
            {i === item.user_roles.length - 1 ? '' : ', '}
          </Text>
        );
      })}

      <Text style={styles.txtDesc}>{item.address}</Text>
    </TouchableOpacity>
  );
}
