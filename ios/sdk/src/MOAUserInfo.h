//
//  MOAUserInfo.h
//  JitsiMeet
//
//  Created by fan on 2020/3/10.
//  Copyright © 2020 Jitsi. All rights reserved.
//

#import <JitsiMeet/JitsiMeet.h>

NS_ASSUME_NONNULL_BEGIN

@interface MOAUserInfo : JitsiMeetUserInfo

/**
 * User id.
 */
@property (nonatomic, copy, nullable) NSString *userId;

- (instancetype _Nullable)initWithDisplayName:(NSString *_Nullable)displayName
                                     andEmail:(NSString *_Nullable)email
                                    andAvatar:(NSURL *_Nullable) avatar
                                    andUserId:(NSURL *_Nullable) userId;

@end

NS_ASSUME_NONNULL_END
