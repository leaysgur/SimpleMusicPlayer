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
  @observable isReady = false;

  // どのタブ
  @observable selectedTab = TABS.PLAYING;

  // 再生中の曲
  @observable nowPlaying = asStructure({
    title:      '-',
    artist:     '-',
    duration:   0,
    artwork:    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D',
    albumTitle: '-',
  });

  @observable currentPlaybackTime = 0;

  // 再生状態
  @observable isSeeking = false;
  @observable playingState = PLAYING_STATE.PAUSE;
  @observable repeatMode = REPEAT_MODE.NONE;

  /**
   * 曲が再生されているか
   *
   * - これがtrueなら再生時間がNative側から同期される
   *
   */
  @computed get isPlaying() {
    return this.playingState === PLAYING_STATE.PLAY &&
           this.isSeeking    === false;
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
   */
  updateNowPlaying({
    title,
    artist,
    duration,
    artwork,
    albumTitle,
  }) {
    // 直接つっこまないのはもっといろいろ付いてきてるから
    this.nowPlaying = {
      title,
      artist,
      duration,
      artwork,
      albumTitle,
    };
  }
}

export default (new AppStore());
