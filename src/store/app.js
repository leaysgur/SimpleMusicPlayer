// @flow
import {
  observable,
  computed,
} from 'mobx';
import {
  TABS,
} from '../const';

class AppStore {
  @observable selectedTab: string = TABS.ARTIST;

  isReady: boolean = false;
  albums: [Object] = [];
}

export type Song = {
  title:   string;
  artist:  string;
  artwork: string;
};

export type Album = {
  title:   string;
  artist:  string;
  artwork: string;
  songs:   [Song];
};

export type AppState = {
  selectedTab: string;
  isReady: boolean;
  albums: [Album];
};

export default (new AppStore());
