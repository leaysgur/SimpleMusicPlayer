import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';
import VolumeSlider from 'react-native-volume-slider';

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
  control_text: {
    padding: 5,
    fontSize: 15,
  }
});

const Controller = ({
  repeatMode,
  playingState,
  togglePlay,
  skipPrev, skipNext,
  changeRepeat,
}) => {
  return (
    <View style={styles.view}>
      <VolumeSlider
        thumbSize={{
          width: 8,
          height: 8
        }}
        thumbTintColor="rgb(146,146,157)"
        minimumTrackTintColor="rgb(146,146,157)"
        maximumTrackTintColor="rgba(255,255,255, 0.1)"
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
  togglePlay:          React.PropTypes.func.isRequired,
  skipPrev:            React.PropTypes.func.isRequired,
  skipNext:            React.PropTypes.func.isRequired,
  changeRepeat:        React.PropTypes.func.isRequired,
};

export default observer(Controller);
