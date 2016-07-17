// @flow
export type AppState = {
  selectedTab: string;
};

export type Song = {
  title:    string;
  artist:   string;
  duration: string;
};
export type Songs = [Song];

export type Album = {
  title:   string;
  artist:  string;
  artwork: string;
  songs:   Songs;
};
export type Albums = [Album];
