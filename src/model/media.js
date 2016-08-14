// @flow
const slice = [].slice;

class Media {
  isFetching: boolean = true;
  songs: Songs = [];
  artists: Artists = [];
  albums: Albums = [];

  init(albums: Albums) {
    this.isFetching = false;

    // アルバム
    this.albums = albums.sort((a, b) => { return a.title > b.title ? 1 : -1 });

    // 曲
    this.albums.forEach((album) => {
      const songs = album.songs.map((song) => {
        song.albumTitle = album.title;
        song.artwork    = album.artwork;
        return song;
      });
      this.songs = this.songs.concat(songs);
    })
    this.songs.sort((a, b) => { return a.title > b.title ? 1 : -1; });

    // アーティスト
    let artistMap = {};
    this.albums.forEach((album) => {
      const artist = album.artist;
      if (artist in artistMap) {
        artistMap[artist].albums.push(album);
      }
      else {
        artistMap[artist] = {
          albums: [album]
        };
      }
    });
    this.artists = Object.keys(artistMap).map((key) => {
      const albums = artistMap[key].albums;
      return {
        name:    key,
        artwork: albums[0].artwork,
        albums:  albums
      };
    }).sort((a, b) => { return a.name > b.name ? 1 : -1; });
    artistMap = {}; // メモリ開放したいけど、nullいれると型がブレる・・
  }
}

export default (new Media());
