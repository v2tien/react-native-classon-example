/* eslint-disable react-native/no-inline-styles */
import {
  Action,
  ActionClientType,
  AgendaCurriculum,
  ClassControl,
  ClassInfo,
  ClassState,
  ClassonPlayer,
  Connection,
  ScriptAction,
  pubsub,
} from '@classon/react-native';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PlayProps } from '../../common/classroom';

export function ClassOn(data: PlayProps) {
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

    pubsub.subscribe('general', fnc);

    return () => {
      pubsub.unsubscribe('general', fnc);
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
        contentContainerStyle={styles.scrollview}
        scrollEnabled={false}
        nestedScrollEnabled>
        <View style={[styles.vRow]}>
          <View style={{ width: data.live ? '100%' : '100%', height: '100%' }}>
            <View style={styles.container}>
              {data.live ? (
                <Connection
                  classId={data.classId ?? ''}
                  token={data.token ?? ''}
                  conferenceType={0}>
                  <ClassonPlayer
                    classId={data.classId ?? ''}
                    token={data.token ?? ''}
                    live={true}
                    user={data.user}
                  />
                </Connection>
              ) : (
                <ClassonPlayer
                  classId={data.classId ?? ''}
                  token={data.token ?? ''}
                  user={data.user}
                />
              )}
            </View>

            {isTeacher && data.live && (
              <View>
                <AgendaCurriculum live={data.live} />
              </View>
            )}

            {isTeacher && data.live && <ScriptAction />}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    width: '100%',
    height: '100%',
  },
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
