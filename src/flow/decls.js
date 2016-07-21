// @flow
export type AppState = {
  selectedTab$: string;
};

export type Song = {
  title:      string;
  artist:     string;
  artwork:    string;
  albumTitle: string;
  trackNo:    number;
  duration:   string;
};
export type Songs = [Song];

export type Album = {
  title:   string;
  artist:  string;
  artwork: string;
  songs:   Songs;
};
export type Albums = [Album];

export type Artist = {
  name:    string;
  artwork: string;
  albums:  Albums;
};
export type Artists = [Artist];
