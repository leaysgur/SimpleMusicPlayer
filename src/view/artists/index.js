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

const ArtistsView = (props) => {
  const route = {
    component: ArtistList,
    title: 'すべてのアーティスト',
    passProps: props
  };

  return (
    <NavigatorIOS
      initialRoute={route}
      style={styles.view}
    />
  );
};

export default ArtistsView;
