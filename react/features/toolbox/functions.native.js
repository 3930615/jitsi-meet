// @flow

import { toState } from '../base/redux';
import { getAppProp } from '../base/app';
import { sendEvent } from '../mobile/external-api';
import { getParticipantsUserInfo } from '../base/participants';

/**
 * Returns true if the toolbox is visible.
 *
 * @param {Object | Function} stateful - A function or object that can be
 * resolved to Redux state by the function {@code toState}.
 * @returns {boolean}
 */
export function isToolboxVisible(stateful: Object | Function) {
    const { alwaysVisible, enabled, visible }
        = toState(stateful)['features/toolbox'];

    return enabled && (alwaysVisible || visible);
}

export function enterInvite() {

    return (dispatch: Dispatch<any>, getState: Function) => {

        const members = getParticipantsUserInfo(getState);
        console.log('members : ', members);
        sendEvent(getState, 'ENTER_INVITE', {members});

        // XXX At the time of this writing this action can only be dispatched by
        // the button which is on the conference view, which means that it's
        // fine to enter PiP mode.
        return getAppProp(getState, 'inviteEnabled')
    };
}
