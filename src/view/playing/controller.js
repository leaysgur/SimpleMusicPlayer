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
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50, // TabBar
  },
  control: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  control_text: {
    padding: 5,
    fontSize: 25,
  },
  control_mode: {
    padding: 5,
    fontSize: 10,
  },
  slider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 0,
  },
});
styles.slider_thumb = {
  width: 10,
  height: 10
};

const Controller = ({
  repeatMode,
  playingState,
  togglePlay,
  skipPrev, skipNext,
  changeRepeat,
}) => {
  return (
    <View style={styles.view}>
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
      </View>

      <View style={styles.slider}>
        <Text>min</Text>
        <VolumeSlider
          thumbSize={styles.slider_thumb}
          thumbTintColor="#999"
          minimumTrackTintColor="#aaa"
          maximumTrackTintColor="#eee"
        />
        <Text>max</Text>
      </View>

      <View style={styles.control}>
        <TouchableOpacity onPress={changeRepeat}>
          <Text style={styles.control_mode}>リピート:{repeatMode}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Controller.propTypes = {
  repeatMode:   React.PropTypes.string.isRequired,
  playingState: React.PropTypes.string.isRequired,
  togglePlay:   React.PropTypes.func.isRequired,
  skipPrev:     React.PropTypes.func.isRequired,
  skipNext:     React.PropTypes.func.isRequired,
  changeRepeat: React.PropTypes.func.isRequired,
};

export default observer(Controller);
