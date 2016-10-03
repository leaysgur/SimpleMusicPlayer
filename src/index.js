import React from 'react';
import {
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

import { Loading } from './view/common';
import App from './app';

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

    rAF();
    function rAF() {
      requestAnimationFrame(rAF);
      if (AppStore.isPlaying) {
        MediaBridge.getCurrentPlaybackTime().then((time) => {
          AppStore.currentPlaybackTime = time;
        });
      }
    }

    this.eventEmitter = new NativeEventEmitter(MediaBridge);
    this.action = new NativeAction(MediaBridge, AppStore);
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
    MediaBridge.fetchMusic()
    .then((music) => {
      MediaModel.init(music);

      this.disposeEmitter = this.eventEmitter.addListener('onPlayItemChanged', (payload) => {
        payload && AppStore.updateNowPlaying(MediaModel.getItem(payload));
      });

      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.disposeEmitter();
  }

}

export default Index;
