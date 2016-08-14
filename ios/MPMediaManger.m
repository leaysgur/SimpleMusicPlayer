#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MPMediaManager, NSObject)

RCT_EXTERN_METHOD(playSong: (NSString *)persistentID)
RCT_EXTERN_METHOD(getAlbums: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end