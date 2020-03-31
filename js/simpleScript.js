/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

"use strict";

const list_items = document.querySelectorAll('.student-item');
const per_page = 10;


/*************
 Show page function - shows the selected page and hides the rest
 @param DOM list, page number to be shown
**************/
function showPage(list, page) {

  // set page start and end based on page parameter passed in
  const page_end = page * per_page;
  const page_start = page_end - per_page;

  console.log(page_end, page_start)
  
  // loop over list
  for (let i = 0, j = list.length; i < j; i++) {
    let list_item = list[i];

    // display pages in desired range and hide the rest
    if (i >= page_start && i < page_end) {
      list_item.style.display = '';
    } else {
      list_item.style.display = 'none';
    }
  }
}


/*************
 Append page links function - Create and append pagination links for list
 @param list to be paginated
**************/
function appendPageLinks(list) {

  // helper function for creating and appending elements
  function createAndAppendElement(element, parent) {
    element = document.createElement(element);
    parent.appendChild(element);
    return element;
  }

  // create and append pagiantion div and ul child
  const main_container = document.querySelector('.page');
  const page_div = createAndAppendElement("DIV", main_container);
  page_div.classList.add('pagination');
  const ul = createAndAppendElement('UL', page_div);

  const number_of_pages = list.length / per_page;

  // loop to create page links
  for (let i = 1, j = Math.ceil(number_of_pages); i <= j; i++) {

    // create and append li and a elements
    const li = createAndAppendElement('LI', ul);
    const a = createAndAppendElement('A', li);
    a.href = '#';
    a.innerHTML = i;

    // add functionality to pagination links
    a.addEventListener('click', e => {

      // remove active class from pagination links
      const links = document.querySelectorAll('.pagination a');
      for (let i = 0, j = links.length; i < j; i++) {
        links[i].classList.remove('active');
      }

      // set clicked pagination link to active;
      e.target.classList.add('active');

      showPage(list, e.target.textContent);  
    });
  }

  // set first pagination link to active initially
  document.querySelector('.pagination a').classList.add('active');
}

showPage(list_items, 1);
appendPageLinks(list_items);