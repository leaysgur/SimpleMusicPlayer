import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artwork: {
    width:  300,
    height: 300,
  }
});

const Item = ({
  title,
  albumTitle,
  artist,
  artwork,
  duration,
}) => {
  return (
    <View
      style={styles.view}
    >
      <Text>==============</Text>
      <Image style={styles.artwork} source={{ uri: artwork }} />
      <Text>{title}</Text>
      <Text>{albumTitle}</Text>
      <Text>{artist}</Text>
      <Text>{duration}</Text>
      <Text>--------------</Text>
    </View>
  );
};
Item.propTypes = {
  title:      React.PropTypes.string.isRequired,
  albumTitle: React.PropTypes.string.isRequired,
  artist:     React.PropTypes.string.isRequired,
  artwork:    React.PropTypes.string.isRequired,
  duration:   React.PropTypes.string.isRequired,
};

export default observer(Item);
