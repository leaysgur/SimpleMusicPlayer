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

  togglePlay: () => {
    MediaBridge.togglePlay();
  },

  skipNext: () => {
    MediaBridge.skipNext();
  },

  skipPrev: () => {
    MediaBridge.skipPrev();
  },

  changeRepeat: () => {
    MediaBridge.changeRepeat().then((mode) => {
      AppStore.updateRepeatMode(mode);
    });
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

    MediaBridge.fetchMusic()
    .then((music) => {
      MediaModel.init(music);

      const myEv = new NativeEventEmitter(MediaBridge);
      myEv.addListener('onPlayItemChanged', (payload) => {
        payload && AppStore.updateNowPlaying(MediaModel.getItem(payload));
      });

      that.forceUpdate();
    });
  }

}

export default Bootstrap;
