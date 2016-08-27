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

const { MediaBridge, } = NativeModules;

const Action = {
  playSong: (persistentID) => {
    MediaBridge.playSong(persistentID);
  },
  playAlbumSong: (persistentID, albumPersistentID) => {
    MediaBridge.playAlbumSong(persistentID, albumPersistentID);
  }
};

class Bootstrap extends React.Component {

  componentDidMount() {
    const that = this;
    MediaBridge.fetch().then((res) => {
      MediaModel.init(res);
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
        action={Action}
      />
    );
  }
}

export default Bootstrap;
