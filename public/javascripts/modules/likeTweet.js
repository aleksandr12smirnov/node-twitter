import axios from 'axios';
import { $ } from './bling';

function ajaxLike(e) {
  // post to api
  axios
    .post(this.dataset.action)
    .then(res => {
      // toggle active class and set users followers to match the data sent back
      this.classList.toggle('tweet-card__control-item--active');
      let element = this.querySelector('.tweet-card__control-item--value');
      if (!isNaN(Number(element.textContent)) || element.textContent === '') {
        // debugger;
        if (![...this.classList].includes('tweet-card__control-item--active')) {
          if (element.textContent !== '') {
            element.textContent = Number(element.textContent) - 1;
          }
        } else {
          element.textContent = Number(element.textContent) + 1;
        }
      }
    })
    .catch(console.error);
}

export default ajaxLike;
