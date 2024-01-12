import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View } from 'react-native';
import { styles } from '../styles';
import { DOMAIN_URL } from '../../common/constants';
import axios from 'axios';
import { Book } from '../../types/book';
import { BackButton } from '../back-button';
import { BookItem } from './book-item';

export function Books() {
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = async () => {
    setLoading(true);

    const contentHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${global.token}`,
    };

    axios
      .get(`${DOMAIN_URL}/v1/books?page=1&page_size=20`, {
        headers: contentHeader,
      })
      .then(async res => {
        const { data, status } = res;
        if (status === 200) {
          setBooks(data.rows);
        } else {
          Alert.alert('Error', `status = ${status}`);
        }
      })
      .catch(err => {
        const msg = err.response?.data?.message || err.message;
        Alert.alert('Error', msg);
        setBooks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.txtName}>Books</Text>
      </View>

      {loading ? (
        <View style={styles.vLoading}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={4}
          data={books}
          renderItem={({ item }) => <BookItem item={item} onPress={() => {}} />}
          keyExtractor={(_, i) => `item-${i}`}
        />
      )}
    </View>
  );
}
