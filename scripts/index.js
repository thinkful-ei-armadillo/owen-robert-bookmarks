'use strict';

$(document).ready(function () {
  bookmark.bindEventListeners();
  bookmark.render();

  // On initial load, fetch Bookmarks and render
  // api.getItems()
  //   .then((items) => {
  //     items.forEach((item) => store.addItem(item));
  //     bookmark.render();
  //   })
  //   .catch(err => console.log(err.message))
});