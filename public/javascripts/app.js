import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import disableTweetButton from './modules/disableButton';
import bindDropdowns from './modules/dropdowns';
import ajaxFollow from './modules/follow';
import ajaxLike from './modules/likeTweet';
import lightbox from './modules/lightbox';

$$('.tweet-form').forEach(disableTweetButton);
bindDropdowns($$('.dropdown'));
$$('.follow-form').on('submit', ajaxFollow);
$$('.tweet-card__likes').on('click', ajaxLike);
lightbox($('#tweet-form-btn'), $('#tweet-form-screen'));

// TODO Add Clipboard copy of tweet url
