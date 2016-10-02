#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MediaBridge, NSObject)
RCT_EXTERN_METHOD(fetch: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(playSong: (NSString *)persistentID)
RCT_EXTERN_METHOD(playAlbumSong: (NSString *)persistentID albumPersistentID:(NSString *)albumPersistentID)
RCT_EXTERN_METHOD(startPause)
RCT_EXTERN_METHOD(prev)
RCT_EXTERN_METHOD(next)
@end
