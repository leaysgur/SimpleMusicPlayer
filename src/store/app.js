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

export type AppState = {
  selectedTab: string,
  isReady: boolean,
  albums: [Object]
}

export default (new AppStore());
