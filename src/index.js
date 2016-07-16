// @flow
import React from 'react';
import {
  NativeModules,
} from 'react-native';
import {
  Loading,
} from './view/common';
import App from './app';
import AppStore from './store/app';

class Bootstrap extends React.Component {

  componentDidMount() {
    const that = this;
    NativeModules.MPMediaManager.getAlbums()
      .then((albums) => {
        AppStore.isReady = true;
        AppStore.albums = [].slice.call(albums);
        that.forceUpdate();
      });
  }

  render() {
    if (!AppStore.isReady) {
      return <Loading />;
    }

    return (
      <App
        store={AppStore}
      />
    );
  }
}

export default Bootstrap;
