// @flow
import React from 'react';
import {
  NavigatorIOS,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ArtistList from './list';

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

class ArtistsView extends React.Component {
  props: {
    artists: Artists
  };

  render() {
    const { artists, } = this.props;

    const route = {
      component: ArtistList,
      title: 'すべてのアーティスト',
      passProps: {
        artists: artists,
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

export default ArtistsView;
