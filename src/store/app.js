import {
  autorun,
  observable,
  // computed,
  asStructure,
} from 'mobx';
import {
  TABS,
} from '../const';

class AppStore {
  @observable selectedTab$ = TABS.PLAYING;

  @observable nowPlaying = asStructure({
    title:      '',
    artist:     '',
    duration:   '',
    artwork:    '',
    albumTitle: '',
  });

  @observable palyBackMode = 1;

  constructor() {
    autorun(() => {
      console.log('autorun');
      const o = Object.assign({}, this.nowPlaying);
      delete o.artwork;
      console.log(o);
      console.log('/autorun');
    });
  }

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
}

export default (new AppStore());
