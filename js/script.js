/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination

--My solution
******************************************/
"use strict";

const main_container = document.querySelector('.page');
const search_container = document.querySelector('.page-header');
const list_container = document.querySelector('.student-list');
const per_page = 10;


/*************
 Show page function - shows the selected page and hides the rest
 @param DOM list, page number to be shown
**************/
function showPage(list, page) {
   // loop over list and show items between page start and page end indexes, hide the rest
   for (let i = 0, j = list.length; i < j; i++) {
      if (i >= (page * per_page) - per_page && i < page * per_page) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

/*************
 Create Element helper function - Creates element, adds attribute and appends to DOM
 @param element to be created, object of attribute name/value pairs, parent to append to
 @return created and appended element
**************/
function createElement(el, attribute_object, parent) {
   el = document.createElement(el);
   parent.appendChild(el);
   for (let attribute in attribute_object) {
      el.setAttribute(attribute, attribute_object[attribute]);
   }
   return el;
}


/*************
 Remove class helper function - Remove class from list of DOM elements
 @param selector of element, class name to be removed
**************/
function removeClass(selector, className) {
   const target = document.querySelectorAll(selector)
   for (let i = 0, j = target.length; i < j; i++) {
      target[i].classList.remove(className);
   }
}


/*************
 Pagination link event handler helper function - Define functionality of pagination buttons
 @param element to receive click event listener, list being worked on, index of element
**************/
function pageLinkAction(el, list, i) {
   // Event listener removes active class from previously active button, shows the appropriate page, adds active class to clicked button
   el.addEventListener('click', e => {
      removeClass('.pagination a', 'active');
      e.target.classList.add('active');
      showPage(list, i);
   });
}


/*************
 Append page links function - Create and append pagination links for list
 @param list to be paginated
**************/
function appendPageLinks(list) {
   // Remove old pagination if present, create paginstion DOM containters, loop over number of pages, create links, add active inital active class, addEvent listener with pageLinkAction helper function
   removeElement('.pagination');
   const page_div = createElement("DIV", {class: 'pagination'}, main_container);
   const ul = createElement('UL', {}, page_div);
   for (let i = 1, j = Math.ceil(list.length / per_page); i <= j; i++) {
      const li = createElement('LI', {}, ul);
      const a = createElement('A', {href: '#'}, li);
      a.innerHTML = i;
      pageLinkAction(a, list, i);
   }
   document.querySelector('.pagination a').classList.add('active');
}

showPage(list_container.children, 1);
appendPageLinks(list_container.children);
createSearch();

/*******
 Exceeds 
********/

// Remove element helper function
function removeElement(selector) {
   const el = document.querySelector(selector);
   if (el) el.parentElement.removeChild(el);
 }
 
 // Create search feature
 function createSearch() {
   const search_div = createElement('DIV', {class: 'student-search'}, search_container);
   const input = createElement('INPUT', {placeholder: 'Search for students...'}, search_div);
   const button = createElement('BUTTON', {}, search_div);
   button.innerHTML = 'Search';
   input.addEventListener('keyup', () => {
      const matches = [];
      seachActivity(matches, input.value.toLowerCase());
      showPage(matches, 1);
      appendPageLinks(matches);
   });
 }
 
 // Sewrch functionality
 function seachActivity(matches, search_value) {
   [...list_container.children].forEach(val => {
      val.style.display = 'none';
      if (val.children[0].children[1].innerHTML.toLowerCase().includes(search_value)) matches.push(val);
   });
 }