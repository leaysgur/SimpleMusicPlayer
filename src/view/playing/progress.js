import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';
import Slider from 'react-native-slider';

import {
  Time
} from '../common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  view: {
    width: width,
    marginBottom: 10,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  slider: {
    height: 20,
  },
  slider_track: {
    height: 5,
    backgroundColor: '#eee',
  },
  slider_thumb: {
    position: 'relative',
    top: 5,
    width: 4,
    height: 20,
    backgroundColor: '#274a78',
    borderRadius: 1,
  }
});

const Progress = ({
  duration,
  currentPlaybackTime,
  changeProgress,
  changedProgress,
}) => {

  return (
    <View style={styles.view}>
      <Slider
        style={styles.slider}
        trackStyle={styles.slider_track}
        thumbStyle={styles.slider_thumb}
        minimumTrackTintColor="#aaa"
        disabled={false}
        onValueChange={changeProgress}
        onSlidingComplete={changedProgress}
        value={currentPlaybackTime/duration}
      />

      <View style={styles.time}>
        <Time seconds={currentPlaybackTime} />
        <Time seconds={duration} />
      </View>
    </View>
  );
};

Progress.propTypes = {
  duration:            React.PropTypes.number.isRequired,
  currentPlaybackTime: React.PropTypes.number.isRequired,
  changeProgress:      React.PropTypes.func.isRequired,
  changedProgress:     React.PropTypes.func.isRequired,
};

export default observer(Progress);
