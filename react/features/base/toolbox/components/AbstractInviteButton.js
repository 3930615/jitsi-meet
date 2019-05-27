// @flow

import AbstractButton from './AbstractButton';
import type { Props } from './AbstractButton';

/**
 * An abstract implementation of a button for disconnecting a conference.
 */
export default class AbstractInviteButton<P : Props, S: *>
    extends AbstractButton<P, S> {

    iconName = 'icon-hangup';

    /**
     * Handles clicking / pressing the button, and disconnects the conference.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {

    }
}
