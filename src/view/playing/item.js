import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    marginBottom: 20,
  },
  artwork: {
    width:  width,
    height: width,
  }
});

const Item = ({
  title,
  albumTitle,
  artist,
  artwork,
}) => {
  return (
    <View
      style={styles.view}
    >
      <Image style={styles.artwork} source={{ uri: artwork }} />
      <Text>{title}</Text>
      <Text>{artist}</Text>
      <Text>{albumTitle}</Text>
    </View>
  );
};
Item.propTypes = {
  title:      React.PropTypes.string.isRequired,
  albumTitle: React.PropTypes.string.isRequired,
  artist:     React.PropTypes.string.isRequired,
  artwork:    React.PropTypes.string.isRequired,
};

export default observer(Item);
