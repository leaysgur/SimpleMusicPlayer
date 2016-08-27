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
  onPressRow,
}: {
  albums: Albums;
  onPressRow: () => {};
}) => {
  const route = {
    component: AlbumList,
    title: 'すべてのアルバム',
    passProps: {
      albums,
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

export default AlbumsView;
