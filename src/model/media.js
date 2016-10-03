/**
 * Nativeから受け取った音楽データを貯めるところ
 *
 * - 初期化されて以降はデータに変更なし
 * - ただ参照されるのみ
 *
 */
class Media {
  songs   = [];
  artists = [];
  albums  = [];
  songMap = {};

  init({
    songs,
    albums,
    albumMap,
    songMap
  }) {

    this.songMap  = songMap;
    let artistMap = {};

    this.songs = songs.map((id) => {
      const song = songMap[id];

      song.persistentID = id;
      song.artwork      = albumMap[song.albumPersistentID].artwork;
      song.albumTitle   = albumMap[song.albumPersistentID].title;

      return song;
    });

    this.albums = albums.map((album) => {
      let albumDuration = 0;

      album.title       = albumMap[album.id].title;
      album.artist      = albumMap[album.id].artist;
      album.artwork     = albumMap[album.id].artwork;
      album.releaseYear = albumMap[album.id].releaseYear;
      album.songs       = album.songs.map((id) => {
        const song = songMap[id];

        song.persistentID = id;
        song.artwork      = albumMap[song.albumPersistentID].artwork;
        song.albumTitle   = albumMap[song.albumPersistentID].title;

        albumDuration += song.duration;
        return song;
      });
      album.duration    = albumDuration;

      // ついでにアーティスト用のデータをつくる
      const artist = album.artist;
      if (artist in artistMap) {
        artistMap[artist].albums.push(album);
      }
      else {
        artistMap[artist] = {
          albums: [album]
        };
      }

      return album;
    }).sort((a, b) => { return a.title > b.title ? 1 : -1; });

    this.artists = Object.keys(artistMap).map((key) => {
      const albums = artistMap[key].albums;
      return {
        name:    key,
        artwork: albums[0].artwork,
        albums:  albums
      };
    }).sort((a, b) => { return a.name > b.name ? 1 : -1; });
  }

  getItem({ persistentID }) {
    return this.songMap[persistentID];
  }
}

export default (new Media());
