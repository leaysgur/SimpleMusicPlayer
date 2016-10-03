import React from 'react';
import {
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

import { Loading } from './view/common';
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

    this.eventEmitter = new NativeEventEmitter(MediaBridge);
    this.action = new NativeAction(MediaBridge, AppStore);

    rAF();

    function rAF() {
      requestAnimationFrame(rAF);
      if (AppStore.canSyncPlaybackTime) {
        MediaBridge.getCurrentPlaybackTime().then((time) => {
          AppStore.currentPlaybackTime = time;
        });
      }
    }
  }

  render() {
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

      this.disposeEmitter = this.eventEmitter.addListener('onPlayItemChanged', (payload) => {
        payload && AppStore.updateNowPlaying(MediaModel.getItem(payload));
      });

      AppStore.isReady = true;
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.disposeEmitter();
  }

}

export default Index;
