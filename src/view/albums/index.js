// @flow
import React from 'react';
import {
  NativeModules,
  NavigatorIOS,
  View,
  Image,
  Text,
} from 'react-native';
import {
  Loading,
} from '../common';
import AlbumList from './list';

class AlbumsView extends React.Component {
  state = {
    albums: []
  };

  componentDidMount() {
    const that = this;
    NativeModules.MPMediaManager.getAlbums()
      .then((albums) => {
        that.setState({ albums: albums });
      });
  }

  render() {
    const { albums, } = this.state;

    if (albums.length === 0) {
      return <Loading />
    }

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
