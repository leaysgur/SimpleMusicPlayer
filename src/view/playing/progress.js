import React from 'react';
import {
  Dimensions,
  View,
  Text,
  Slider,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

import {
  Time
} from '../common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  view: {
    width: width,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  slider: {
    height: 10,
    backgroundColor: '#303030',
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
        disabled={false}
        onValueChange={changeProgress}
        onSlidingComplete={changedProgress}
        value={currentPlaybackTime/duration}
      />

      <View style={styles.time}>
        <Text><Time seconds={currentPlaybackTime} /> / <Time seconds={duration} /></Text>
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
