// @flow
import React from 'react';
import {
  StyleSheet,
  NavigatorIOS,
  View,
  Text,
} from 'react-native';
import {
  Loading,
} from '../common';
import SongList from './list';

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

class SongsView extends React.Component {
  render() {
    const { songs, } = this.props;

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
        style={styles.view}
      />
    );
  }
}

export default SongsView;
