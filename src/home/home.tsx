import React, { useEffect } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { BackButton } from './back-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { DOMAIN_URL } from '../common/constants';

export function Home() {
  const navigation = useNavigation<any>();

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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton
          onBack={() => {
            AsyncStorage.multiRemove(['TOKEN', 'USER']);
            navigation.replace('Login');
          }}
        />
        <Text style={styles.txtName}>Home</Text>
      </View>

      <View style={styles.vHome}>
        <TouchableOpacity
          style={[styles.item, styles.btnOption]}
          onPress={() => navigation.navigate('Classes')}>
          <Text style={styles.txtName}>Classes</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.item, styles.btnOption]}
          onPress={() => navigation.navigate('Books')}>
          <Text style={styles.txtName}>Books</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
