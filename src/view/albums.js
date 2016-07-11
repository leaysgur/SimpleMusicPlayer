// @flow
import React from 'react';
import {
  NativeModules,
  StyleSheet,
  View,
  Text,
} from 'react-native';

class AlbumsView extends React.Component {
  state = {
    albums: []
  };

  componentDidMount() {
    const that = this;
    NativeModules.MPMediaManager.getAlbumsAsync()
      .then((albums) => {
        that.setState({ albums: albums });
      });
  }

  render() {
    const { albums, } = this.state;

    let List = (<Text>Now loading...</Text>);

    if (albums.length) {
      List = albums.map((album, idx) => {
        return (
          <Text key={idx}>{album}</Text>
        );
      })
    }

    return (
      <View style={styles.container}>
        {List}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default AlbumsView;
