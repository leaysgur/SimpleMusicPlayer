import {
  asStructure,
  computed,
  observable,
} from 'mobx';

import {
  TABS,
  PLAYING_STATE,
  REPEAT_MODE,
} from '../const';


class AppStore {
  // 音楽データ取得完了
  @observable isReady = false;
  // どのタブ
  @observable selectedTab = TABS.ALBUM;

  // 再生中の曲
  @observable nowPlaying = asStructure({
    title:      '-',
    artist:     '-',
    duration:   0,
    artwork:    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D',
    albumTitle: '-',
  });
  // 再生中の曲（再生中に変化するのはコレだけ）
  @observable currentPlaybackTime = 0;

  // 再生状態
  @observable isSeeking = false;
  @observable playingState = PLAYING_STATE.PAUSE;
  @observable repeatMode = REPEAT_MODE.ALL;

  /**
   * 曲が再生されているか
   *
   * - これがtrueなら再生時間がNative側から同期される
   *
   */
  @computed get canSyncPlaybackTime() {
    return this.playingState === PLAYING_STATE.PLAY &&
           this.isSeeking    === false;
  }

  /**
   * 曲が再生されているか
   *
   * - 再生・一時停止ボタン用に
   *
   */
  @computed get isPlaying() {
    return this.playingState === PLAYING_STATE.PLAY;
  }

  /**
   * 曲のシーク
   *
   * - seekが終わった最後の1回は、isSeekedがtrue
   *
   */
  seek(val, isSeeked) {
    if (this.nowPlaying.duration === 0) { return; }

    this.currentPlaybackTime = this.nowPlaying.duration * val;
    this.isSeeking = isSeeked;
  }

  /**
   * 曲が切り替わった時にNativeに呼ばれる
   *
   * - 直接つっこまないのは、他にもいろいろ付いてきてるから
   *
   */
  updateNowPlaying({
    title,
    artist,
    duration,
    artwork,
    albumTitle,
  }) {
    this.nowPlaying = {
      title,
      artist,
      duration,
      artwork,
      albumTitle,
    };
  }

  /**
   * イヤホンが抜けて再生が止まったときとかに、UIの状態をチェックする
   *
   */
  checkPause(state) {
    if (state !== PLAYING_STATE) {
      this.playingState = state;
    }
  }
}

export default (new AppStore());
