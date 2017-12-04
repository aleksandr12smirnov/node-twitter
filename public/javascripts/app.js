import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import disableButton from './modules/disableButton';
import bindDropdowns from './modules/dropdowns';

disableButton($('#tweet-input'), $('#tweet-submit'));
bindDropdowns($$('.dropdown'));
