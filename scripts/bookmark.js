'use strict';
/* global $, store, api */

//event handlers
const bookmark = (function() {

  const generateFormHtml = function() {
    return `
      <form class="add-item-form">
        <label for="item-title">Bookmark Title:</label>
        <input type="text" class="item-title">

        <label for="item-description">Bookmark Description:</label>
        <input type="text" class="item-description">

        <label for="item-url">Bookmark URL</label>
        <input type="text" class="item-url">

        <label for="item-rating">Bookmark Rating</label>
        <input type="number" min="1" max="5" value="5" class="item-rating">

        <button type="submit">Submit</button>
      </form>`;
  };

  const generateBookmarkHtml = function(item) {
    const expanded = item.isExpanded ? `<li>${item.description}</li><li>${item.url}</li>` : ''; 
    const expandArrow = item.isExpanded ? 'expand-up' : 'expand-down'; 
    
    return `
      <li class="bookmark-item js-bookmark-item" data-item-id="${item.id}">
        <span class="bookmark">
          <ul>
            <li>${item.title}</li>
            <li>${item.rating}</li>
            ${expanded}
          </ul>
        </span>
        <div class="bookmark-controls js-bookmark-controls">
          <button class="toggle-expand js-toggle-expand ${expandArrow}">^</button>
          <button class="remove js-remove">X</button>
        </div>
      </li>`;
  };


  const generateListHtml = function(array) {
    return array.map((item) => generateBookmarkHtml(item)).join('');
    // return store.items.map((item) => generateBookmarkHtml(item)).join('');
  };

  const filterRating = function() {
    return store.items.filter((item) => item.rating >= store.minRating);
  };

  const render = function () {
    $('.js-bookmark-list').html(generateListHtml(filterRating()));

    if (store.isAdding) {
      $('.add-item-panel').html(generateFormHtml());
    }
    if (store.error) {
      $('.error-popup').toggleClass('hidden');
      $('.error-popup').text(store.error);
      store.error = null;
    }
    store.minRating = 0;
  }; 

  const handleAddItem = function() {
    $('.js-add-item').on('click', function() {
      store.isAdding = true;
      render();
    });
  };

  const handleformSubmit = function () {
    $('.add-item-panel').on('submit', function(e) {
      e.preventDefault();
      // let obj = serializeJSON(event.target)
      // new Formdata, in order to catch all inputs
      api.createItem(obj)
        .then(newItem => {
          store.addItem(newItem);
          render();
        })
        .catch(err => {
          store.error = err.message;
          render();
        }); // API call to POST item with given parameters, add to store.items after successful run
    });
  };
  
  // come back later to handle minRating state reflecting on select element
  const handleMinRating = function () {
    $('.min-rating').change(function() {
      store.minRating = $('.min-rating').val();
      render();      
    });
  };

  const handleExpand = function () {
    $('.bookmark-list-container').on('click', '.toggle-expand', function (e) {
      let itemID = findIDbyElement(e.target);
      let item = store.items.find(item => item.id === itemID);
      item.isExpanded = !item.isExpanded;
      render();
    });
  };

  const findIDbyElement = function (target) {
    return $(target).parents('.bookmark-item').attr('data-item-id');
  };

  const handleDeleteItem = function () {
    $('.bookmark-list-container').on('click', '.remove', function (e){
      let itemID = findIDbyElement(e.target);
      store.items = store.items.filter(item => item.id !== itemID);
      render();
      // api.deleteItem(item);

    });
  };

  const bindEventListeners = function () {
    handleExpand();
    handleMinRating();
    handleAddItem();
    handleformSubmit();
    handleDeleteItem();
  };

  return {
    render,
    bindEventListeners
  };

})();
