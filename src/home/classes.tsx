import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native';
import { DOMAIN_URL } from '../common/constants';
import { styles } from './styles';
import { ClassItem } from './class-item';
import { BackButton } from './back-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Class } from '../types/class';

export function Classes() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [classes, setClasses] = useState<Class[]>([]);

  const getUserInfo = async () => {
    const contentHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${global.token}`,
    };

    axios
      .get(`${DOMAIN_URL}/v1/auth/me`, {
        headers: contentHeader,
      })
      .then(async res => {
        const { data, status } = res;
        if (status === 200) {
          console.log(31, 'getUserInfo', data);
          global.user = data;
          await AsyncStorage.setItem('USER', JSON.stringify(data));
        } else {
          Alert.alert('Error', `status = ${status}`);
        }
      })
      .catch(err => {
        const msg = err.response?.data?.message || err.message;
        Alert.alert('Error', msg);
      });
  };

  const getClasses = async () => {
    setLoading(true);

    const contentHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${global.token}`,
    };

    axios
      .get(`${DOMAIN_URL}/v1/classes?page=1&page_size=20`, {
        headers: contentHeader,
      })
      .then(async res => {
        const { data, status } = res;
        if (status === 200) {
          console.log(31, 'getClasses', data);
          setClasses(data.rows);
        } else {
          Alert.alert('Error', `status = ${status}`);
        }
      })
      .catch(err => {
        const msg = err.response?.data?.message || err.message;
        Alert.alert('Error', msg);
        setClasses([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserInfo();
    getClasses();
  }, []);

  const renderItem = ({ item }: { item: Class }) => <ClassItem item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton
          onBack={() => {
            AsyncStorage.multiRemove(['TOKEN', 'USER']);
            navigation.replace('Login');
          }}
        />
        <Text style={styles.txtName}>Classes</Text>
      </View>

      {loading ? (
        <View style={styles.vLoading}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={4}
          data={classes}
          renderItem={renderItem}
          keyExtractor={(_, i) => `item-${i}`}
        />
      )}
    </View>
  );
}
