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


const SongsView = (props) => {
  const route = {
    component: SongList,
    title: 'すべての曲',
    passProps: props,
  };

  return (
    <NavigatorIOS
      initialRoute={route}
      style={styles.view}
    />
  );
};

export default SongsView;
