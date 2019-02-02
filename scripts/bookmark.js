/* eslint-disable no-unused-vars */
'use strict';
/* global $, store, api */

//event handlers
const bookmark = (function() {

  const generateFormHtml = function() {
    return `
      <form class="add-item-form">
        <label for="item-title">Bookmark Title:</label>
        <input type="text" name = "title" class="item-title">

        <label for="item-description">Bookmark Description:</label>
        <input type="text" name = "desc" class="item-description">

        <label for="item-url">Bookmark URL</label>
        <input type="text" name = "url" class="item-url">

        <label for="item-rating">Bookmark Rating</label>
        <input type="number" name = "rating" min="1" max="5" value="5" class="item-rating">

        <button type="submit" role="button">Submit</button>
      </form>`;
  };

  const generateBookmarkHtml = function(item) {
    const expanded = item.isExpanded ? `<li>${item.desc}</li><li><a href = "${item.url}">visit site</a></li>` : ''; 
    const expandArrow = item.isExpanded ? 'expand-up' : 'expand-down'; 
    const ratingClass = ['one-star', 'two-star', 'three-star', 'four-star', 'five-star'];

    console.log(`this bookmark is rated ${item.rating}, which accesses the ${ratingClass[item.rating-1]} string element`)
    
    return `
      <li class="bookmark-item js-bookmark-item " data-item-id="${item.id}">
        <span class="bookmark">
          <ul>
            <li><h2>${item.title}</h2></li>
            <li class="star ${ratingClass[item.rating-1]}"></li>
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

    $('.add-item-panel, .error-popup').empty();
    // $('.error-popup').empty();

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

  $.fn.extend({
    serializeJson: function () {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });

  const handleformSubmit = function () {
    $('.add-item-panel').on('submit', function(e) {
      e.preventDefault();
      let obj = $('form').serializeJson();

      // new Formdata, in order to catch all inputs
      api.createItem(obj)
        .then(newItem => {
          store.createItem(newItem);
          store.isAdding = false; //what's going on with this line
          render();
        })
        .catch(error => {
          store.error = error;
          render();
        });
    });
  };
  // }); // API call to POST item with given parameters, add to store.items after successful run

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
      //store.items = store.items.filter(item => item.id !== itemID);
      //render();
      api.deleteItem(itemID)
        .then(() =>{
          store.items = store.items.filter(item => item.id !== itemID);
          render();
        })
        .catch(error => {
          store.error = error;
          render();
        });
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
