/* eslint-disable no-unused-vars */
'use strict';

const api = function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com';
  const key = 'bob-owen';

  const apiCall = function (...args) {
    let error = '';
    return fetch(...args)
      .then(res => {
        if(!res.ok) {
          error = true;
        }
        return res.json();
      })
      .then(data =>{
        if(error) {
          throw new Error(data.message);
        }
        return data;
      });
  };

  const getList = function () {
    return apiCall(`${BASE_URL}/${key}/bookmarks`);
  };

  const createItem = function(item) {
    return apiCall(`${BASE_URL}/${key}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: item
    });
  };

  const deleteItem = function(id) {
    return apiCall(`${BASE_URL}/${key}/bookmarks/${id}`, {
      method: 'DELETE'
    });  
  };
  
  return {
    getList,
    createItem,
    deleteItem
  };
}();
