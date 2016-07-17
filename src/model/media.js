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
    this.albums.forEach((album) => {
      this.songs = this.songs.concat(album.songs);
    })
    this.songs.sort((a, b) => { return a.title > b.title ? 1 : -1; });
  }
}

export default (new Media());
