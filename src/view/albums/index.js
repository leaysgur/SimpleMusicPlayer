import React from 'react';
import {
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

import AlbumList from './list';


const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

const AlbumsView = (props) => {
  const route = {
    component: AlbumList,
    title: 'すべてのアルバム',
    passProps: props,
  };

  return (
    <NavigatorIOS
      initialRoute={route}
      style={styles.view}
    />
  );
};

export default AlbumsView;
