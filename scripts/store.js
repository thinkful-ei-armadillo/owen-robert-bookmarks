'use strict';

const store = (function(){
  const items = [];

  let isAdding = false;
  let error = null;
  let minRating = 0;

  const createItem = function(item) {
    items.push(item);
  }

  return {
    createItem,
    items,
    isAdding,
    error,
    minRating
  };
})();