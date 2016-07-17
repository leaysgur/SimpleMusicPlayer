// @flow
import React from 'react';
import {
  NavigatorIOS,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import AlbumList from './list';

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

class AlbumsView extends React.Component {
  props: {
    albums: [Object]
  };

  render() {
    const { albums, } = this.props;

    const route = {
      component: AlbumList,
      title: 'アルバム',
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
  }
}

export default AlbumsView;
