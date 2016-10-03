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

  @observable currentPlaybackTime = 0;
  @observable playingState = 'pause';
  @observable repeatMode = 'none';

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
