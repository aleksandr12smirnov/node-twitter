/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = obj => JSON.stringify(obj, null, 2);

// get icons
exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.svg`);

// format large numbers into shortend strings
exports.formatNumber = num => {
  num = Number(num);
  if (num > 99999) {
    return (num / 100000).toFixed(0) + 'M';
  } else if (num > 999) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num;
};
// Some details about the site
exports.siteName = `Node Twitter`;
