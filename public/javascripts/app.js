import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import disableButton from './modules/disableButton';
import bindDropdowns from './modules/dropdowns';
import ajaxFollow from './modules/follow';
import ajaxLike from './modules/likeTweet';
import toggleScreen from './modules/toggleScreen';

disableButton($('#tweet-input'), $('#tweet-submit'));
bindDropdowns($$('.dropdown'));
$$('.follow-form').on('submit', ajaxFollow);
$$('.tweet-card__likes').on('click', ajaxLike);
toggleScreen(
  $('#tweet-form-btn'),
  $('.tweet-form-screen'),
  $('.tweet-form-screen > *')
);

// TODO Add Clipboard copy of tweet url
