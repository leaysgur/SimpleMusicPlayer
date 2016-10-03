import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

import Item from './item';
import Controller from './controller';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  }
});

const PlayingView = ({
  nowPlaying,
  repeatMode,
  playingState,
  currentPlaybackTime,
  controllerAction,
}) => {
  return (
    <View style={styles.view}>
      <Item {...nowPlaying} />
      <Controller
        duration={nowPlaying.duration}
        repeatMode={repeatMode}
        playingState={playingState}
        currentPlaybackTime={currentPlaybackTime}
        {...controllerAction}
      />
    </View>
  );
};
PlayingView.propTypes = {
  nowPlaying:          React.PropTypes.object.isRequired,
  repeatMode:          React.PropTypes.string.isRequired,
  playingState:        React.PropTypes.string.isRequired,
  currentPlaybackTime: React.PropTypes.string.isRequired,
  controllerAction:    React.PropTypes.object.isRequired,
};

export default observer(PlayingView);
