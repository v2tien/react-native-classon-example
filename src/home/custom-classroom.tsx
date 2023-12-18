import {
  Action,
  ActionClient,
  ActionClientType,
  AgendaCurriculum,
  BlueseaConference,
  ClassControl,
  ClassInfo,
  ClassState,
  ClassonPlayer,
  Connection,
  ScriptAction,
  pubsub,
  pubsubClient,
} from '@classon/react-native';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PlayProps } from '../common/classroom';

export function ClassOn(data: PlayProps) {
  const [show, setShow] = useState<boolean>(true);

  const isTeacher = data.user.role === 'TEACHER' ? true : false;

  useEffect(() => {
    const fnc = (action: Action) => {
      if (action.type !== ActionClientType.ReadyToStart) {
        return;
      }

      if (action.payload.action === 'error') {
        Alert.alert('Error', action.payload.message);
        return;
      }
    };

    const controlFnc = (action: ActionClient) => {
      if (action.type !== ActionClientType.ToggleConference) {
        return;
      }

      setShow(action.payload.showSideBar);
    };

    pubsub.subscribe('general', fnc);
    pubsubClient.subscribe('control', controlFnc);

    return () => {
      pubsub.unsubscribe('general', fnc);
      pubsubClient.unsubscribe('control', controlFnc);
    };
  }, []);

  return (
    <View style={styles.container}>
      {isTeacher && data.live && (
        <View style={styles.vControl}>
          <ClassState isTeacher={isTeacher} live={data.live} />
          <ClassControl />
          <ClassInfo />
        </View>
      )}

      <KeyboardAwareScrollView
        contentContainerStyle={{ width: '100%', height: '100%' }}
        scrollEnabled={false}
        nestedScrollEnabled>
        <View style={[styles.vRow]}>
          <View style={{ width: data.live ? '80%' : '100%', height: '100%' }}>
            <View style={styles.container}>
              {data.live ? (
                <Connection
                  classId={data.classId ?? ''}
                  token={data.token ?? ''}
                  conferenceType={0}>
                  <ClassonPlayer
                    bookData={data.bookData}
                    live={true}
                    user={data.user}
                  />
                </Connection>
              ) : (
                <ClassonPlayer bookData={data.bookData} user={data.user} />
              )}
            </View>

            {isTeacher && data.live && (
              <View>
                <AgendaCurriculum live={data.live} />
              </View>
            )}

            {isTeacher && data.live && <ScriptAction />}
          </View>

          {show && data.live && <BlueseaConference />}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vControl: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  vRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
