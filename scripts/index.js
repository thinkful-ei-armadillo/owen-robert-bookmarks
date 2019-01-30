'use strict';
/* global $, bookmark, store, api */

$(document).ready(function () {
  bookmark.bindEventListeners();
  // On initial load, fetch Bookmarks and render
  api.getList()
    .then((items) => {
      items.forEach((item) => store.createItem(item));
      bookmark.render();
    })
    .catch(err => console.log(err.message));
});