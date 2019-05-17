// @flow

import { NativeModules } from 'react-native';
import type { Dispatch } from 'redux';

import { getAppProp } from '../../base/app';
import { Platform } from '../../base/react';

import { ENTER_INVITE } from './actionTypes';

const logger = require('jitsi-meet-logger').getLogger(__filename);

declare var APP: Object;

/**
 * Enters (or rather initiates entering) picture-in-picture.
 * Helper function to enter PiP mode. This is triggered by user request
 * (either pressing the button in the toolbox or the home button on Android)
 * ans this triggers the PiP mode, iff it's available and we are in a
 * conference.
 *
 * @public
 * @returns {Function}
 */
export function enterInvite() {
    return (dispatch: Dispatch<any>, getState: Function) => {
        // XXX At the time of this writing this action can only be dispatched by
        // the button which is on the conference view, which means that it's
        // fine to enter PiP mode.
        if (getAppProp(getState, 'inviteEnabled')) {
            const { Invite } = NativeModules;
            const members = APP.conference.listMembersUserIds();
            const p
                = Platform.OS === 'android' || Platform.OS === 'ios'
                    ? Invite
                        ? Invite.enterInvite({ members })
                        : Promise.reject(
                            new Error('invite not supported'))
                    : Promise.resolve();

            p.then(
                () => dispatch({ type: ENTER_INVITE }),
                e => logger.warn(`Error entering invite mode: ${e}`));
        }
    };
}
