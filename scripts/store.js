'use strict';

const store = (function(){
  const items = [{
    id: '1001',
    title: 'The Matrix',
    URL: 'www.thematrix.com',
    description: 'sci-fi thriller...',
    rating: 4,
    isExpanded: true
  },
  {
    id: '1002',
    title: 'Lord of the Rings',
    URL: 'www.LOTR.com',
    description: 'fantasy epic',
    rating: 2,
    isExpanded: false
  }];

  let isAdding = false;
  let error = null;
  let minRating = 0;

  return {
    items,
    isAdding,
    error,
    minRating
  };
})();