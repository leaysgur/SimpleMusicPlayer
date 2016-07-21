// @flow
const slice = [].slice;

class Media {
  isFetching: boolean = true;
  songs: [Object] = [];
  artists: [Object] = [];
  albums: Albums = [];

  init(albums: Albums) {
    this.isFetching = false;

    this.albums = slice.call(albums);

    this.songs = [];
    this.albums.forEach((album) => {
      const songs = album.songs.map((song) => {
        song.albumTitle = album.title;
        song.artwork    = album.artwork;
        return song;
      });
      this.songs = this.songs.concat(songs);
    })
    this.songs.sort((a, b) => { return a.title > b.title ? 1 : -1; });
  }
}

export default (new Media());
