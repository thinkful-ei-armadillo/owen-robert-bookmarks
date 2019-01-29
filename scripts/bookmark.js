'use strict'

//event handlers
const bookmark = function() {

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
      </form>`
  }

  const generateBookmarkHtml = function(item) {
    const expanded = item.isExpanded ? `<li>${item.description}</li><li>${item.url}</li>` : ''; 
    const expandArrow = item.isExpanded ? 'expand-up' : 'expand-down'; 
    
    return `
      <li class="bookmark-item js-bookmark-item" data-item-id=${item.id }>
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
      </li>`
  }


  const generateListHtml = function() {
    return store.items.map((item) => generateBookmarkHtml(item)).join('')
  }

  const render = function () {
    $('.js-bookmark-list').html(generateListHtml());

    if (isAdding) {
      $('.add-item-panel').html(generateFormHtml());
    }
  } 

  const handleAddItem = function() {

  }

  const handleformSubmit = function () {

  }

  const handleMinRating = function () {

  }

  const handleExpand = function () {

  }

  const handleDeleteItem = function () {

  }

  return {
    handleAddItem,
    handleformSubmit,
    handleMinRating,
    handleExpand,
    handleDeleteItem
  }

}()