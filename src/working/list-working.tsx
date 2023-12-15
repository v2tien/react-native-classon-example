import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native';
import { DOMAIN_URL } from '../common/constants';
import { BackButton } from '../home/back-button';
import { styles } from './styles';
import { WorkingItem } from './working-item';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Partner } from '../types/partner';

export function ListWorking() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [workplaces, setWorkplaces] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { token } = route.params;

  const getWorking = useCallback(async () => {
    setLoading(true);

    const contentHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${DOMAIN_URL}/v1/auth/partners`, {
        headers: contentHeader,
      })
      .then(async res => {
        const { data, status } = res;
        console.log(34, 'getWorking', res);
        if (status === 200) {
          setWorkplaces(data.rows);
        } else {
          Alert.alert('Error', `status = ${status}`);
        }
      })
      .catch(err => {
        const msg = err.response?.data?.message || err.message;
        Alert.alert('Error', msg);
        setWorkplaces([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    getWorking();
  }, [getWorking]);

  const selectWorking = useCallback(
    async (item: Partner) => {
      const contentHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const params = { partner_id: item.id };

      axios
        .post(`${DOMAIN_URL}/v1/auth/working`, params, {
          headers: contentHeader,
        })
        .then(async res => {
          const { data, status } = res;
          if (status === 200) {
            global.token = data.token.jwt;
            await AsyncStorage.setItem('TOKEN', data.token.jwt);
            navigation.replace('Classes');
          } else {
            Alert.alert('Error', `status = ${status}`);
          }
        })
        .catch(err => {
          const msg = err.response?.data?.message || err.message;
          Alert.alert('Error', msg);
        });
    },
    [navigation, token],
  );

  const renderItem = ({ item }: { item: Partner }) => (
    <WorkingItem item={item} selectWorking={() => selectWorking(item)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.txtName}>Workplaces</Text>
      </View>

      {loading ? (
        <View style={styles.vLoading}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={workplaces}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(_, i) => `item-${i}`}
        />
      )}
    </View>
  );
}
