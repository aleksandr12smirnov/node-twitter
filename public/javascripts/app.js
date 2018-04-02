import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import disableTweetButton from './modules/disableButton';
import bindDropdowns from './modules/dropdowns';
import ajaxFollow from './modules/follow';
import ajaxLike from './modules/likeTweet';

$$('.tweet-form').forEach(disableTweetButton);
bindDropdowns($$('.dropdown'));
$$('.follow-form').on('submit', ajaxFollow);
$$('.tweet-card__likes').on('click', ajaxLike);

// TODO Add Clipboard copy of tweet url
