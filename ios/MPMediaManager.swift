import MediaPlayer

let noCloudPre = MPMediaPropertyPredicate(
  value: NSNumber(bool: false),
  forProperty: MPMediaItemPropertyIsCloudItem
)

@objc(MediaBridge) class MediaBridge: RCTEventEmitter {
  let player: MPMusicPlayerController = MPMusicPlayerController.systemMusicPlayer()

  override init() {
    super.init()

    // どうせAllなので最初から
    player.repeatMode = .All
    // シャッフル機能はオフから
    player.shuffleMode = .Off
    // 初期化
    player.currentPlaybackTime = 0
    player.nowPlayingItem = nil
    player.stop()
    
    // 曲が変わったらイベントで知らせる
    NSNotificationCenter.defaultCenter().addObserver(
      self,
      selector: #selector(MediaBridge._playItemChanged(_:)),
      name: MPMusicPlayerControllerNowPlayingItemDidChangeNotification,
      object: player
    )
    NSNotificationCenter.defaultCenter().addObserver(
      self,
      selector: #selector(MediaBridge._playbackStateChanged(_:)),
      name: MPMusicPlayerControllerPlaybackStateDidChangeNotification,
      object: player
    )
    player.beginGeneratingPlaybackNotifications()
  }
  
  deinit {
    player.endGeneratingPlaybackNotifications()
    player.stop()
  }

  override func supportedEvents() -> [String]! {
    return ["onPlayItemChanged", "onPlaybackStateChanged"]
  }
  
  @objc func fetchMusic(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
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
          "artwork":     __image2base64String(artwork.imageWithSize(artwork.bounds.size)!),
          "title":       albumItem.albumTitle  ?? "No title",
          "artist":      albumItem.albumArtist ?? "Various Artists",
          "releaseYear": albumItem.valueForProperty("year") ?? "",
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
          "duration":          songItem.playbackDuration,
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
    player.currentPlaybackTime = 0
    player.nowPlayingItem = nil

    let query = MPMediaQuery.songsQuery()
    query.addFilterPredicate(noCloudPre)
    player.setQueueWithQuery(query)
    
    player.nowPlayingItem = self._getNowPlayingItem(persistentID)
    player.play()
  }
  
  @objc func playAlbumSong(persistentID: String, albumPersistentID: String) {
    player.currentPlaybackTime = 0
    player.nowPlayingItem = nil
    
    let query = MPMediaQuery.albumsQuery()
    query.addFilterPredicate(noCloudPre)
    query.addFilterPredicate(MPMediaPropertyPredicate(
      value: albumPersistentID,
      forProperty: MPMediaItemPropertyAlbumPersistentID,
      comparisonType: MPMediaPredicateComparison.EqualTo
    ))
    player.setQueueWithQuery(query)
    
    player.nowPlayingItem = self._getNowPlayingItem(persistentID)
    player.play()
  }
  
  @objc func togglePlay(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    if (player.playbackState == .Playing) {
      player.pause()
      resolve("pause")
    } else {
      player.play()
      resolve("play")
    }
  }
  
  @objc func skipPrev() {
    if (player.currentPlaybackTime > 1) {
      player.skipToBeginning()
    } else {
      player.skipToPreviousItem()
    }
  }
  
  @objc func skipNext() {
    player.skipToNextItem()
  }
  
  @objc func changeRepeat(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    switch (player.repeatMode) {
    case .None:
      player.repeatMode = .One
      resolve("one")
      break
    case .One:
      player.repeatMode = .All
      resolve("all")
      break
    case .All:
      player.repeatMode = .None
      resolve("none")
      break
    default:
      resolve("default")
    }
  }
  
  @objc func changeShuffle(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    switch (player.shuffleMode) {
    case .Off:
      player.shuffleMode = .Songs
      resolve("songs")
      break
    case .Songs:
      player.shuffleMode = .Off
      resolve("off")
      break
    default:
      resolve("default")
    }
  }
  
  @objc func changePlaybackTime(val: Double) {
    if let mediaItem = player.nowPlayingItem {
      let time = mediaItem.playbackDuration * val
      player.currentPlaybackTime = time
    }
  }
  
  @objc func getCurrentPlaybackTime(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    if (player.nowPlayingItem != nil) {
      return resolve(player.currentPlaybackTime)
    }
    return resolve(0)
  }

  
  func _playItemChanged(notify:NSNotificationCenter) {
    if let mediaItem = player.nowPlayingItem {
      var nowPlaying = [String: String]()
      nowPlaying["persistentID"]      = String(mediaItem.persistentID)
      nowPlaying["albumPersistentID"] = String(mediaItem.albumPersistentID)
      self.sendEventWithName("onPlayItemChanged", body: nowPlaying)
    }
  }
  
  func _playbackStateChanged(notify:NSNotificationCenter) {
    switch (player.playbackState) {
    case .Interrupted:
      self.sendEventWithName("onPlaybackStateChanged", body: "pause")
      break
    case .Paused:
      self.sendEventWithName("onPlaybackStateChanged", body: "pause")
      break
    case .Stopped:
      self.sendEventWithName("onPlaybackStateChanged", body: "pause")
      break
    default:
      self.sendEventWithName("onPlaybackStateChanged", body: "play")
    }
  }
  
  func _getNowPlayingItem(persistentID: String) -> MPMediaItem {
    let nowPlayingQuery = MPMediaQuery.songsQuery()
    nowPlayingQuery.addFilterPredicate(noCloudPre)
    nowPlayingQuery.addFilterPredicate(MPMediaPropertyPredicate(
      value: persistentID,
      forProperty: MPMediaItemPropertyPersistentID,
      comparisonType: MPMediaPredicateComparison.EqualTo
    ))

    return nowPlayingQuery.items![0]
  }
  
}


func __image2base64String(image: UIImage) -> String {
  let data: NSData = UIImagePNGRepresentation(image)!
  let encodeString: String = data.base64EncodedStringWithOptions(NSDataBase64EncodingOptions.Encoding64CharacterLineLength)
  
  return "data:image/png;base64," + encodeString
}
