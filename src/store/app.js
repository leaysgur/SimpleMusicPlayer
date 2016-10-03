import {
  asStructure,
  computed,
  observable,
} from 'mobx';
import {
  TABS,
} from '../const';

class AppStore {
  @observable selectedTab = TABS.ALBUM;

  @observable nowPlaying = asStructure({
    title:      '曲を選んでね',
    artist:     '-',
    duration:   '00:00:00',
    artwork:    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D',
    albumTitle: '-',
  });

  @observable _currentPlaybackTime = 0;
  @observable playingState = 'pause';
  @observable repeatMode = 'none';

  @computed get currentPlaybackTime() {
    return _toDispDuration(this._currentPlaybackTime);

    function _toDispDuration(seconds) {
      seconds = Math.floor(seconds);

      let hours = Math.floor(seconds / 3600);
      seconds -= hours*3600;

      let minutes = Math.floor(seconds / 60);
      seconds -= minutes*60;

      if (hours) {
        if (hours < 10) { hours = '0' + hours; }
        return `${hours}:${minutes}:${seconds}`;
      }

      if (minutes < 10) { minutes = '0' + minutes; }
      if (seconds < 10) { seconds = '0' + seconds; }
      return `${minutes}:${seconds}`;
    }
  }

  @computed get isPlaying() {
    return this.playingState === 'play';
  }

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
