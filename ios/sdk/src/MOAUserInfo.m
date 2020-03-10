//
//  MOAUserInfo.m
//  JitsiMeet
//
//  Created by fan on 2020/3/10.
//  Copyright © 2020 Jitsi. All rights reserved.
//

#import "MOAUserInfo.h"
#import "JitsiMeetUserInfo+Private.h"

@implementation MOAUserInfo

- (instancetype _Nullable)initWithDisplayName:(NSString *_Nullable)displayName
                                     andEmail:(NSString *_Nullable)email
                                    andAvatar:(NSURL *_Nullable) avatar
                                    andUserId:(NSURL *_Nullable) userId {
    self = [super initWithDisplayName:displayName andEmail:email andAvatar:avatar];
    if (self) {
        self.userId = userId;
    }
    return self;
}

- (NSDictionary *)asDict {
    NSMutableDictionary *dict = [super asDict];
    if (self.userId != nil) {
        dict[@"userId"] = self.userId;
    }
    return dict;
}

@end
