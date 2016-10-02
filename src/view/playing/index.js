import React from 'react';
import {
  StyleSheet,
  NavigatorIOS,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

import Player from './player';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  }
});

const PlayingView = ({
  nowPlaying,
}) => {
  const route = {
    component: Player,
    title: `再生中${nowPlaying.title}`,
    passProps: {
      ...nowPlaying,
    }
  };

  return (
    <NavigatorIOS
      initialRoute={route}
      style={styles.view}
    />
  );
};
PlayingView.propTypes = {
  nowPlaying: React.PropTypes.object.isRequired,
};

export default observer(PlayingView);
