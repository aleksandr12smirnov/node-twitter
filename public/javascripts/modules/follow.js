import axios from 'axios';
import { $ } from './bling';

function ajaxFollow(e) {
  // stop form from submitting
  e.preventDefault();

  // post to api
  axios
    .post(this.action)
    .then(res => {
      // toggle active class and set users followers to match the data sent back
      this.follow.classList.toggle('follow-btn--active');
      $(this.dataset.target).textContent = res.data.followers.length;
    })
    .catch(console.error);
}

export default ajaxFollow;
