// @flow
import React from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Image,
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
  },

  tli: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  tli_artwork: {
    width: 55,
    height: 55,
  },
  tli_body: {
    flex: 1,
    paddingLeft: 10
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
};

export const ThumbListItem = ({
  imgUri,
  // $FlowFixMe
  children,
}: {
  imgUri: string;
}) => {
  return (
    <View style={styles.tli}>
      <Image style={styles.tli_artwork} source={{ uri: imgUri }} />
      <View style={styles.tli_body}>
        {children}
      </View>
    </View>
  );
};

export const items2DataSource = (items: [Object]) => {
  return (new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  })).cloneWithRows(items)
};
