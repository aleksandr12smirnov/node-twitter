import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import disableButton from './modules/disableButton';

disableButton($('#tweet-input'), $('#tweet-submit'));
