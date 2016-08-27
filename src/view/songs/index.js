// @flow
import React from 'react';
import {
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import SongList from './list';

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

const SongsView = ({
  songs,
  onPressRow,
}: {
  songs: Songs;
  onPressRow: () => {};
}) => {
  const route = {
    component: SongList,
    title: 'すべての曲',
    passProps: {
      songs,
      onPressRow,
    }
  };

  return (
    <NavigatorIOS
      initialRoute={route}
      style={styles.view}
    />
  );
};

export default SongsView;
