import React from 'react';
import {
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {
  Loading,
} from './view/common';
import App from './app';
import AppStore from './store/app';
import MediaModel from './model/media';

const {
  MediaBridge,
} = NativeModules;

const Action = {
  playSong: (persistentID) => {
    MediaBridge.playSong(persistentID);
  },

  playAlbumSong: (persistentID, albumPersistentID) => {
    MediaBridge.playAlbumSong(persistentID, albumPersistentID);
  },

  startPause: () => {
    MediaBridge.startPause();
  },

  next: () => {
    MediaBridge.next();
  },

  prev: () => {
    MediaBridge.prev();
  },
};

class Bootstrap extends React.Component {

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

  componentDidMount() {
    const that = this;
    MediaBridge.fetch()
      .then((res) => {
        MediaModel.init(res);

        const myEv = new NativeEventEmitter(MediaBridge);
        myEv.addListener('onPlayItemChanged', (payload) => {
          payload && AppStore.updateNowPlaying(MediaModel.getItem(payload));
        });

        that.forceUpdate();
      });
  }

}

export default Bootstrap;
