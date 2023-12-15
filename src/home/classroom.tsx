import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ActionClientType,
  pubsubClient,
  ActionClient,
  pubsub,
} from '@classon/react-native';
import { ClassOn } from '@classon/react-native';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { PlayProps } from '../common/classroom';

export function Classroom() {
  const navigation = useNavigation();

  const route = useRoute<any>();
  const { data }: { data: PlayProps } = route.params;

  const [block, setlock] = useState<boolean>(true);

  React.useEffect(() => {
    const fnc = (action: ActionClient) => {
      if (action.type === 'loading-error') {
        // console.log('tienvt26: ', action.payload.url);
        Alert.alert('Error', action.payload.message, [
          {
            text: 'Back',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
          {
            text: 'ignore',
            onPress: () => {
              if (action.payload.typeError === 'source') {
                pubsubClient.publish('load-source', {
                  type: ActionClientType.LoadingIgnore,
                  payload: { url: action.payload.url },
                });
              }
              if (action.payload.typeError === 'sound') {
                pubsubClient.publish('load-source', {
                  type: ActionClientType.IgnoreSound,
                  payload: { url: action.payload.url },
                });
              }
            },
          },
        ]);
      }

      if (action.type === 'loading-complete') {
        setlock(false);
      }
    };

    const fncFinish = (a: ActionClient) => {
      if (a.type === ActionClientType.FinishClassroom) {
        Alert.alert('Message', 'Lớp học đã kết thúc!', [
          { text: 'Back', onPress: () => navigation.goBack() },
        ]);
      }
    };

    pubsubClient.subscribe('load-source', fnc);
    pubsubClient.subscribe('control', fncFinish);

    return () => {
      pubsubClient.unsubscribe('load-source', fnc);
      pubsubClient.unsubscribe('control', fncFinish);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.vControl}>
        <Button
          title="Back"
          onPress={() => {
            navigation.goBack();
          }}
        />

        {!block && !data.hasSocket && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
              title="Start"
              onPress={() => {
                pubsubClient.publish('control', {
                  type: ActionClientType.StartClassroom,
                }); // Hoc offline
                // pubsub.publish('general', { type: 'start-class' }); // Hoc online
              }}
            />

            <Button
              title="Prev"
              onPress={() => {
                pubsub.publish('general', {
                  type: 'prev-page',
                });
              }}
            />

            <Button
              title="Next"
              onPress={() => {
                pubsub.publish('general', {
                  type: 'next-page',
                });
              }}
            />
          </View>
        )}
      </View>

      <ClassOn
        classId={data.classId ?? 'class_test'}
        token={data.token ?? ''}
        user={data.user}
        bookData={data.bookData}
        live={data.hasSocket ?? false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vControl: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 10,
    top: 0,
  },
});
