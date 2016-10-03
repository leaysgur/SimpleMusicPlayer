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
const { MediaBridge } = NativeModules;


class Bootstrap extends React.Component {
  constructor() {
    super();

    rAF();
    function rAF() {
      requestAnimationFrame(rAF);
      if (AppStore.isPlaying) {
        MediaBridge.getCurrentPlaybackTime().then((time) => {
          AppStore.currentPlaybackTime = time;
        });
      }
    }

    this.action = {
      playSong: (persistentID) => {
        MediaBridge.playSong(persistentID);
        AppStore.playingState = 'play';
      },

      playAlbumSong: (persistentID, albumPersistentID) => {
        MediaBridge.playAlbumSong(persistentID, albumPersistentID);
        AppStore.playingState = 'play';
      },

      togglePlay: () => {
        MediaBridge.togglePlay().then((state) => {
          AppStore.playingState = state;
        });
      },

      skipNext: () => {
        MediaBridge.skipNext();
      },

      skipPrev: () => {
        MediaBridge.skipPrev();
      },

      changeRepeat: () => {
        MediaBridge.changeRepeat().then((mode) => {
          AppStore.repeatMode = mode;
        });
      },

      changeProgress: (val) => {
        AppStore.seek(val, true);
        MediaBridge.changePlaybackTime(val);
      },

      changedProgress: (val) => {
        MediaBridge.changePlaybackTime(val);
        AppStore.seek(val, false);
      },
    };
  }

  render() {
    if (MediaModel.isFetching) {
      return <Loading />;
    }

    return (
      <App
        store={AppStore}
        model={MediaModel}
        action={this.action}
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
