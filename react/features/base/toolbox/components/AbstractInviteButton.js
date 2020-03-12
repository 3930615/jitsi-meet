
// @flow
// @todo this file moa added
import { IconAddPeople } from '../../icons';

import AbstractButton from './AbstractButton';
import type { Props } from './AbstractButton';

/**
 * An abstract implementation of a button for disconnecting a conference.
 */
export default class AbstractInviteButton<P : Props, S: *>
    extends AbstractButton<P, S> {

    icon = IconAddPeople;

    /**
     * Handles clicking / pressing the button, and disconnects the conference.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {

    }
}

