import React from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Image,
  Text,
} from 'react-native';


const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loader_text: {
    fontSize: 20,
  },

  separator: {
    height: 1,
    backgroundColor: '#ccc'
  },

  tli: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  tli_artwork: {
    width: 55,
    height: 55,
  },
  tli_body: {
    flex: 1,
    paddingLeft: 10
  },

  time: {
    fontFamily: 'Hiragino Sans',
  },
});

export const Loading = () => {
  return (
    <View style={styles.loader}>
      <Text style={styles.loader_text}>Now loading...</Text>
    </View>
  );
};

export const Separator = () => {
  return (
    <View
      style={styles.separator}
    />
  );
};

export const ThumbListItem = ({
  imgUri,
  children,
}) => {
  return (
    <View style={styles.tli}>
      <Image style={styles.tli_artwork} source={{ uri: imgUri }} />
      <View style={styles.tli_body}>
        {children}
      </View>
    </View>
  );
};
ThumbListItem.propTypes = {
  imgUri:   React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
};

export const Time = ({
  seconds
}) => {
  return <Text style={styles.time}>{_toDispDuration(seconds)}</Text>;

  function _toDispDuration(seconds) {
    seconds = Math.floor(seconds);

    let hours = Math.floor(seconds / 3600);
    seconds -= hours*3600;

    let minutes = Math.floor(seconds / 60);
    seconds -= minutes*60;

    if (hours) {
      if (hours < 10) { hours = '0' + hours; }
      return `${hours}:${minutes}:${seconds}`;
    }

    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }
    return `${minutes}:${seconds}`;
  }
};
Time.propTypes = {
  seconds: React.PropTypes.number.isRequired,
};

export const items2DataSource = (items) => {
  return (new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  })).cloneWithRows(items);
};
