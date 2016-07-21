// @flow
import React from 'react';
import {
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import ArtistList from './list';

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
});

const ArtistsView = ({
  artists,
}: {
  artists: Artists;
}) => {
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
};

export default ArtistsView;
