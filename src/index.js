// @flow
import React from 'react';
import {
  NativeModules,
} from 'react-native';
import {
  Loading,
} from './view/common';
import App from './app';

class Bootstrap extends React.Component {
  state = {
    isReady: false,
    albums:  []
  };

  componentDidMount() {
    const that = this;
    NativeModules.MPMediaManager.getAlbums()
      .then((albums) => {
        that.setState({
          albums: albums,
          isReady: true,
        })
      });
  }

  render() {
    const {
      albums,
      isReady,
    } = this.state;

    if (!isReady) {
      return <Loading />;
    }

    return (
      <App
        albums={albums}
      />
    );
  }
}

export default Bootstrap;
