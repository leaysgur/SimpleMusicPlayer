import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

import Artwork from './artwork';
import Progress from './progress';
import Item from './item';
import Controller from './controller';


const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

const PlayingView = ({
  nowPlaying,
  repeatMode,
  isPlaying,
  currentPlaybackTime,
  controllerAction,
}) => {
  return (
    <View style={styles.view}>

      <Artwork url={nowPlaying.artwork} />

      <Progress
        currentPlaybackTime={currentPlaybackTime}
        duration={nowPlaying.duration}
        {...controllerAction}
      />

      <Item {...nowPlaying} />

      <Controller
        repeatMode={repeatMode}
        isPlaying={isPlaying}
        {...controllerAction}
      />

    </View>
  );
};

PlayingView.propTypes = {
  nowPlaying:          React.PropTypes.object.isRequired,
  repeatMode:          React.PropTypes.string.isRequired,
  isPlaying:           React.PropTypes.bool.isRequired,
  currentPlaybackTime: React.PropTypes.number.isRequired,
  controllerAction:    React.PropTypes.object.isRequired,
};

export default observer(PlayingView);
