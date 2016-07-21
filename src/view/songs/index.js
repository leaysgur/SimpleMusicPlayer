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
}: {
  songs: Songs;
}) => {
  const route = {
    component: SongList,
    title: 'すべての曲',
    passProps: {
      songs: songs,
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
