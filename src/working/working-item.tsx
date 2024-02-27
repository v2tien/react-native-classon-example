import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Partner } from '../types/partner';
import { UserRole } from '../types/role';

export function WorkingItem(props: {
  item: Partner;
  selectWorking: (role_id: string) => void;
}) {
  const { item, selectWorking } = props;

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <TouchableOpacity style={styles.vItem} onPress={() => setVisible(!visible)}>
      <Text style={styles.txtName}>
        {item.title} ({item.code})
      </Text>
      <Text style={styles.txtDesc}>{item.domain}</Text>
      <Text style={styles.txtDesc}>{item.address}</Text>

      {visible && <View style={styles.line} />}

      {visible && (
        <View>
          {item.user_roles.map((e: UserRole, i: number) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.vRole}
                onPress={() => selectWorking(e.role_id)}>
                <Text key={e.id} style={[styles.txtRole]}>
                  Role: {e.roles.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </TouchableOpacity>
  );
}
