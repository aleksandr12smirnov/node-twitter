import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import disableButton from './modules/disableButton';
import bindDropdowns from './modules/dropdowns';
import ajaxFollow from './modules/follow';

disableButton($('#tweet-input'), $('#tweet-submit'));
bindDropdowns($$('.dropdown'));
$('.follow-form').on('submit', ajaxFollow);

// TODO Add Clipboard copy of tweet url
