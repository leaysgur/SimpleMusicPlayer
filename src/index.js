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
import MediaModel from './model/media';

class Bootstrap extends React.Component {

  componentDidMount() {
    const that = this;
    NativeModules.MPMediaManager
      .getAlbums()
      .then((albums) => {
        MediaModel.init(albums);
        that.forceUpdate();
      });
  }

  render() {
    if (MediaModel.isFetching) {
      return <Loading />;
    }

    return (
      <App
        store={AppStore}
        model={MediaModel}
      />
    );
  }
}

export default Bootstrap;
