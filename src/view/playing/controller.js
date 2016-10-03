import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';
import VolumeSlider from 'react-native-volume-slider';

const prevIcon  = require('../../icon/prev.png');
const nextIcon  = require('../../icon/next.png');
const playIcon  = require('../../icon/play.png');
const pauseIcon = require('../../icon/pause.png');

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
    justifyContent: 'space-around',
  },
  control_icon: {
    padding: 10,
    width: 30,
    height: 30,
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
  isPlaying,
  togglePlay,
  skipPrev, skipNext,
  changeRepeat,
}) => {
  return (
    <View style={styles.view}>
      <View style={styles.control}>
        <TouchableOpacity onPress={skipPrev}>
          <Image style={styles.control_icon} source={prevIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlay}>
          { isPlaying ?
            <Image style={styles.control_icon} source={pauseIcon} /> :
            <Image style={styles.control_icon} source={playIcon} />
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={skipNext}>
          <Image style={styles.control_icon} source={nextIcon} />
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
  isPlaying:    React.PropTypes.bool.isRequired,
  togglePlay:   React.PropTypes.func.isRequired,
  skipPrev:     React.PropTypes.func.isRequired,
  skipNext:     React.PropTypes.func.isRequired,
  changeRepeat: React.PropTypes.func.isRequired,
};

export default observer(Controller);
