// @flow
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  separator: {
    height: 1,
    backgroundColor: '#ccc'
  }
});

export const Loading = () => {
  return (
    <View style={styles.loader}>
      <Text>Now loading...</Text>
    </View>
  );
};

export const Separator = () => {
  return (
    <View
      style={styles.separator}
    />
  );
}
