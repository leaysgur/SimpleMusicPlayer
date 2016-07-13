// @flow
import React from 'react';
import {
  NavigatorIOS,
  View,
  Text,
} from 'react-native';
import AlbumList from './list';

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
        style={{flex: 1}}
      />
    );
  }
}

export default AlbumsView;
