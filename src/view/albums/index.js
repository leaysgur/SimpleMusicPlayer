// @flow
import React from 'react';
import {
  NativeModules,
  View,
  Image,
  Text,
} from 'react-native';
import {
  Loading,
} from '../common';

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
            <View key={idx}>
              <Image style={{width:64, height:64}} source={{ uri: `data:image/png;base64, ${album.artwork }` }} />
              <Text>{album.artist}: {album.title}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

export default AlbumsView;
