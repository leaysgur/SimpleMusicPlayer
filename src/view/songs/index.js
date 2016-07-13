// @flow
import React from 'react';
import {
  NativeModules,
  NavigatorIOS,
  View,
  Text,
} from 'react-native';
import {
  Loading,
} from '../common';
import SongList from './list';

class SongsView extends React.Component {
  state = {
    songs: []
  };

  componentDidMount() {
    const that = this;
    // NativeModules.MPMediaManager.getSongs()
    //   .then((songs) => {
    //     that.setState({ songs: songs });
    //   });
  }

  render() {
    const { songs, } = this.state;

    if (songs.length === 0) {
      return <Loading />;
    }

    const route = {
      component: SongList,
      title: 'すべての曲',
      passProps: {
        songs: songs,
      },
      rightButtonTitle: '@',
      onRightButtonPress: () => {}
    };

    return (
      <NavigatorIOS
        initialRoute={route}
        style={{flex: 1}}
      />
    );
  }
}

export default SongsView;
