import React from 'react';
import {
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  observer,
} from 'mobx-react/native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  artwork: {
    width:  width,
    height: width,
  }
});

const Artwork = ({
  url,
}) => {
  return (
    <Image
      style={styles.artwork}
      source={{ uri: url }}
    />
  );
};

Artwork.propTypes = {
  url: React.PropTypes.string.isRequired,
};

export default observer(Artwork);
