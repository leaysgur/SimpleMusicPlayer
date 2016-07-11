//
//  MPMediaManager.swift
//  SimpleMusicPlayer
//
//  Created by Yuji Sugiura on 2016/07/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//
import Foundation
import MediaPlayer


@objc(MPMediaManager)
class MPMediaManager: NSObject {

  @objc func getAlbums(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    let albumsQuery: MPMediaQuery = MPMediaQuery.albumsQuery()
    
    var albums = [[String: String]]()
    if let albumCollection: [MPMediaItemCollection] = albumsQuery.collections {
      for album in albumCollection {
        guard let title = album.representativeItem!.albumTitle else {
          continue
        }

        guard let artist = album.representativeItem!.albumArtist else {
          continue
        }
        
        let albumView = [
          "title":  title,
          "artist": artist ?? "V.A."
        ]

        albums.append(albumView)
      }
    }
    
    resolve(albums)
  }

}
