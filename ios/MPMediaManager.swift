//
//  MPMediaManager.swift
//  SimpleMusicPlayer
//
//  Created by Yuji Sugiura on 2016/07/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//
import Foundation
import MediaPlayer

func _image2String(image: UIImage) -> String {
  let data: NSData = UIImagePNGRepresentation(image)!
  let encodeString: String = data.base64EncodedStringWithOptions(NSDataBase64EncodingOptions.Encoding64CharacterLineLength)

  return encodeString
}


@objc(MPMediaManager) class MPMediaManager: NSObject {
  
  @objc func getAlbums(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    let albumsQuery: MPMediaQuery = MPMediaQuery.albumsQuery()
    
    var albums = [[String: AnyObject]]()
    if let albumCollection: [MPMediaItemCollection] = albumsQuery.collections {
      for album in albumCollection {
        guard let title = album.representativeItem!.albumTitle else {
          continue
        }
        guard let artist = album.representativeItem!.albumArtist else {
          continue
        }
        guard let artwork = album.representativeItem!.artwork else {
          continue
        }

        let artworkStr = _image2String(artwork.imageWithSize(artwork.bounds.size)!);
        

        var songs = [[String: String]]()
        for song in (album.items) {
          songs.append([
            "title": song.title!,
            "artist": song.artist!,
            "artwork": artworkStr
          ])
        }
        
        albums.append([
          "title":  title  ?? "No title",
          "artist": artist ?? "V.A.",
          "artwork": artworkStr,
          "songs": songs
        ])
      }
    }
    
    resolve(albums)
  }

}
