import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { DOMAIN_URL } from '../common/constants';

export function Login() {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLogin = async () => {
    if (username.length === 0 || password.length === 0) {
      return;
    }
    setLoading(true);
    const param = { username, password };
    const contentHeader = {
      'Content-Type': 'application/json',
    };

    axios
      .post(`${DOMAIN_URL}/v1/auth/login`, param, {
        headers: contentHeader,
      })
      .then(async res => {
        const { data, status } = res;
        if (status === 200) {
          navigation.navigate('Working', { token: data.token.jwt });
        } else {
          Alert.alert('Error', `status = ${status}`);
        }
      })
      .catch(err => {
        const msg = err.response?.data?.message || err.message;
        Alert.alert('Error', msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      nestedScrollEnabled>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          editable={!loading}
          underlineColorAndroid="transparent"
          returnKeyType="done"
          placeholder="Enter username"
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          editable={!loading}
          underlineColorAndroid="transparent"
          returnKeyType="done"
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          disabled={loading}
          style={styles.btnLogin}
          onPress={onLogin}>
          {!loading ? <Text>Login</Text> : <ActivityIndicator />}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
