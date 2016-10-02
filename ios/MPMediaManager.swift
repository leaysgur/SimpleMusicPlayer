import MediaPlayer

@objc(MediaBridge) class MediaBridge: RCTEventEmitter {
  let player = MPMusicPlayerController.systemMusicPlayer()
  var _nowPlayingQuery = MPMediaQuery()

  override func supportedEvents() -> [String]! {
    return ["onPlayItemChanged"]
  }
  
  override init() {
    super.init()
    
    // TODO: MPMusicPlayerControllerPlaybackStateDidChangeNotification も
    NSNotificationCenter.defaultCenter().addObserver(
      self,
      selector: #selector(MediaBridge.playItemChanged(_:)),
      name: MPMusicPlayerControllerNowPlayingItemDidChangeNotification,
      object: player
    )
    player.beginGeneratingPlaybackNotifications()
  }

  func playItemChanged(notify:NSNotificationCenter) {
    if let mediaItem = player.nowPlayingItem {
      var nowPlaying = [String: String]()
      nowPlaying["persistentID"]      = String(mediaItem.persistentID)
      nowPlaying["albumPersistentID"] = String(mediaItem.albumPersistentID)
      self.sendEventWithName("onPlayItemChanged", body: nowPlaying)
    }
  }
  
  
  @objc func fetch(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    // TODO: なぜか効いてない・・？
    let noCloudPre = MPMediaPropertyPredicate(
      value: NSNumber(bool: false),
      forProperty: MPMediaItemPropertyIsCloudItem
    )

    var albums = [[String: AnyObject]]()
    let albumsQuery: MPMediaQuery = MPMediaQuery.albumsQuery()
    albumsQuery.addFilterPredicate(noCloudPre)
    
    var albumMap = [String: AnyObject]()
    if let albumCollection: [MPMediaItemCollection] = albumsQuery.collections {
      for album in albumCollection {
        let albumItem = album.representativeItem!
        guard let artwork = albumItem.artwork else {
          continue
        }
        
        let albumPersistentID = String(albumItem.albumPersistentID);
        albumMap[albumPersistentID] = [
          "artwork": __image2base64String(artwork.imageWithSize(artwork.bounds.size)!),
          "title":   albumItem.albumTitle  ?? "No title",
          "artist":  albumItem.albumArtist ?? "Various Artists",
        ]
        
        var songs = [String]()
        for song in (album.items) {
          songs.append(String(song.persistentID))
        }
        
        albums.append([
          "id":    albumPersistentID,
          "songs": songs
        ])
      }
    }
    
    var songs = [String]()
    var songMap = [String: [String: AnyObject]]()
    let songsQuery = MPMediaQuery.songsQuery()
    
    songsQuery.addFilterPredicate(noCloudPre)
    if let songCollection: [MPMediaItemCollection] = songsQuery.collections {
      for song in songCollection {
        let songItem = song.representativeItem!
        let persistentID = String(songItem.persistentID)
        
        songs.append(persistentID)
        songMap[persistentID] = [
          "title":             songItem.title  ?? "No title",
          "artist":            songItem.artist ?? "Various Artists",
          "duration":          __formatTimeString(songItem.playbackDuration),
          "trackNo":           songItem.albumTrackNumber,
          "albumPersistentID": String(songItem.albumPersistentID)
        ]
      }
    }
    
    resolve([
      "songs":    songs,
      "albums":   albums,
      "albumMap": albumMap,
      "songMap":  songMap
    ])
  }
  
  @objc func playSong(persistentID: String) {
    player.setQueueWithQuery(MPMediaQuery.songsQuery())
    
    player.nowPlayingItem = self._getNowPlayingItem(persistentID)
    player.play()
  }
  
  @objc func playAlbumSong(persistentID: String, albumPersistentID: String) {
    let query = MPMediaQuery.albumsQuery()
    query.addFilterPredicate(MPMediaPropertyPredicate(
      value: albumPersistentID,
      forProperty: MPMediaItemPropertyAlbumPersistentID,
      comparisonType: MPMediaPredicateComparison.EqualTo
    ))
    player.setQueueWithQuery(query)
    
    player.nowPlayingItem = self._getNowPlayingItem(persistentID)
    player.play()
  }

  func _getNowPlayingItem(persistentID: String) -> MPMediaItem {
    _nowPlayingQuery = MPMediaQuery()
    
    _nowPlayingQuery.addFilterPredicate(MPMediaPropertyPredicate(
      value: persistentID,
      forProperty: MPMediaItemPropertyPersistentID,
      comparisonType: MPMediaPredicateComparison.EqualTo
      ))
    
    return _nowPlayingQuery.items![0]
  }
}


func __image2base64String(image: UIImage) -> String {
  let data: NSData = UIImagePNGRepresentation(image)!
  let encodeString: String = data.base64EncodedStringWithOptions(NSDataBase64EncodingOptions.Encoding64CharacterLineLength)
  
  return "data:image/png;base64," + encodeString
}

func __formatTimeString(d: Double) -> String {
  let s: Int = Int(d % 60)
  let m: Int = Int((d - Double(s)) / 60 % 60)
  let h: Int = Int((d - Double(m) - Double(s)) / 3600 % 3600)
  
  return String(format: "%02d:%02d:%02d", h, m, s)
}

