import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { DOMAIN_URL } from '../common/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { ClassItem } from './class-item';
import { BackButton } from './back-button';

export function Classes() {
  const [loading, setLoading] = useState<boolean>(false);
  const [classes, setClasses] = useState<any>();

  const getClasses = async () => {
    setLoading(true);

    const token = await AsyncStorage.getItem('TOKEN');
    const contentHeader = {
      'Content-Type': 'application/json',
    };

    axios
      .get(`${DOMAIN_URL}/v1/classes?page=1&page_size=20`, {
        headers: contentHeader,
      })
      .then(async res => {
        const { data, status } = res;
        console.log(22, res);
        if (status === 200) {
          //todo
          setClasses(data.rows);
        } else {
          Alert.alert('Error', `status = ${status}`);
        }
      })
      .catch(err => {
        console.log(30, err);
        const msg = err.response?.data?.message || err.message;
        Alert.alert('Error', msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // getClasses();
  }, []);

  const renderItem = () => <ClassItem />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.txtName}>Classes</Text>
      </View>

      <FlatList
        numColumns={4}
        data={[1, 2, 3, 4, 5]}
        renderItem={renderItem}
        keyExtractor={(_, i) => `item-${i}`}
      />
    </View>
  );
}
