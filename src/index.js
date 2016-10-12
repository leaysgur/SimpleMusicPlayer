import React from 'react';
import {
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

import {
  Error,
  Loading,
} from './view/common';
import App from './view/app';

import AppStore from './store/app';
import MediaModel from './model/media';

import NativeAction from './native-action';

const { MediaBridge } = NativeModules;


/**
 * React Nativeにマウントされるエントリーコンポーネント
 *
 * - Native側とのやりとりはココで全てやってしまう
 *
 */
class Index extends React.Component {
  constructor() {
    super();

    this.listeners = [];
    this.eventEmitter = new NativeEventEmitter(MediaBridge);
    this.action = new NativeAction(MediaBridge, AppStore);

    rAF();
    function rAF() {
      requestAnimationFrame(rAF);
      if (AppStore.canSyncPlaybackTime) {
        MediaBridge.getCurrentPlaybackTime().then((time) => {
          AppStore.currentPlaybackTime = time;
        })
        .catch((e) => {
          AppStore.reportError(e);
          this.forceUpdate();
        });
      }
    }
  }

  render() {
    if (AppStore.isError) {
      return <Error message={AppStore.errorMsg} />;
    }

    if (AppStore.isReady === false) {
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
    MediaBridge.fetchMusic()
    .then((music) => {
      MediaModel.init(music);

      this.listeners.push(this.eventEmitter.addListener('onPlayItemChanged', (payload) => {
        payload && AppStore.updateNowPlaying(MediaModel.getItem(payload));
      }));
      this.listeners.push(this.eventEmitter.addListener('onPlaybackStateChanged', (payload) => {
        AppStore.checkPause(payload);
      }));

      AppStore.isReady = true;
      this.forceUpdate();
    })
    .catch((e) => {
      AppStore.reportError(e);
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.listeners.forEach((disposer) => { disposer(); });
  }

}

export default Index;
