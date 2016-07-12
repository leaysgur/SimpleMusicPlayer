// @flow
import React from 'react';
import {
  NativeModules,
  View,
  Text,
} from 'react-native';
import {
  Loading,
} from './common';

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

    return (
      <View>
        {albums.map((album, idx) => {
          return (
            <Text key={idx}>{album.artist}: {album.title}</Text>
          );
        })}
      </View>
    );
  }
}

export default AlbumsView;
