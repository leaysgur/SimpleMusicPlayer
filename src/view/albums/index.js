// @flow
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

const AlbumsView = ({
  albums,
}: {
  albums: Albums;
}) => {
  const route = {
    component: AlbumList,
    title: 'すべてのアルバム',
    passProps: {
      albums: albums,
    }
  };

  return (
    <NavigatorIOS
      initialRoute={route}
      style={styles.view}
    />
  );
};

export default AlbumsView;
