import axios from 'axios';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { DOMAIN_URL } from '../common/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Classes() {
  const getClasses = async () => {
    // setLoading(true);

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
        // setLoading(false);
      });
  };

  useEffect(() => {
    getClasses();
  }, []);

  return <></>;
}
