import React from 'react';
import {
  View,
  Text,
  Slider,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';
import {
  Time
} from '../common';

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50 + 10, // TabBar + padding
  },
  control: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  control_text: {
    padding: 5,
    fontSize: 15,
  }
});

const Controller = ({
  duration,
  repeatMode,
  playingState,
  currentPlaybackTime,
  togglePlay,
  skipPrev, skipNext,
  changeRepeat,
  changeProgress,
  changedProgress,
}) => {

  return (
    <View style={styles.view}>
      <View style={styles.time}>
        <Text><Time seconds={currentPlaybackTime} /> / <Time seconds={duration} /></Text>
      </View>

      <Slider
        disabled={false}
        onValueChange={changeProgress}
        onSlidingComplete={changedProgress}
        value={currentPlaybackTime/duration}
      />

      <View style={styles.control}>
        <TouchableOpacity onPress={skipPrev}>
          <Text style={styles.control_text}>前へ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlay}>
          <Text style={styles.control_text}>{playingState === 'play' ? '一時停止' : '再生'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipNext}>
          <Text style={styles.control_text}>次へ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeRepeat}>
          <Text style={styles.control_text}>リピート:{repeatMode}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
Controller.propTypes = {
  repeatMode:          React.PropTypes.string.isRequired,
  playingState:        React.PropTypes.string.isRequired,
  duration:            React.PropTypes.number.isRequired,
  currentPlaybackTime: React.PropTypes.number.isRequired,
  togglePlay:          React.PropTypes.func.isRequired,
  skipPrev:            React.PropTypes.func.isRequired,
  skipNext:            React.PropTypes.func.isRequired,
  changeRepeat:        React.PropTypes.func.isRequired,
  changeProgress:      React.PropTypes.func.isRequired,
  changedProgress:     React.PropTypes.func.isRequired,
};

export default observer(Controller);
