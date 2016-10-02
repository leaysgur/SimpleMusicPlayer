#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MediaBridge, NSObject)
RCT_EXTERN_METHOD(fetchMusic: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(playSong: (NSString *)persistentID)
RCT_EXTERN_METHOD(playAlbumSong: (NSString *)persistentID albumPersistentID:(NSString *)albumPersistentID)
RCT_EXTERN_METHOD(togglePlay)
RCT_EXTERN_METHOD(skipPrev)
RCT_EXTERN_METHOD(skipNext)
RCT_EXTERN_METHOD(changeRepeat: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
@end
