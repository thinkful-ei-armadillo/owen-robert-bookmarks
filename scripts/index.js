'use strict';

$(document).ready(function () {
  bookmark.bindEventListeners();
  bookmark.render();

 // On initial load, fetch Bookmarks and render
  api.getList()
    .then((items) => {
      items.forEach((item) => store.createItem(item));
      bookmark.render();
    })
    //.catch(err => console.log(err.message))
});