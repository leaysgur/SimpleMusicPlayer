// @flow
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const style = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export const Loading = () => {
  return (
    <View style={style.loader}>
      <Text>Now loading...</Text>
    </View>
  );
};
