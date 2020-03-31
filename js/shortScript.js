/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination

--Attempt at shortest solution
******************************************/

"use strict";  

const list_container = document.querySelector('.student-list');
const per_page = 10;

function showPage(list, page) {
  [...list].forEach((val, i) => (i >= (page * per_page) - per_page && i < page * per_page) ? val.style.display = '' : val.style.display = 'none');
}

function createElement(el, attribute_object, parent) {
  el = document.createElement(el);
  Object.keys(attribute_object).forEach(val => el.setAttribute(val, attribute_object[val]));
  return parent.appendChild(el);
}

function removeClass(selector, className) { 
  [...document.querySelectorAll(selector)].forEach(val => val.classList.remove(className));
}

function pageLinkAction(el, list, i) {
  el.addEventListener('click', e => {
    removeClass('.pagination a', 'active');
    e.target.classList.add('active');
    showPage(list, i);
  });
}

function appendPageLinks(list) {
  removeElement('.pagination');
  const main_container = document.querySelector('.page');
  let page_div = createElement("DIV", {class: 'pagination'}, main_container);
  let ul = createElement('UL', {}, page_div);
  for (let i = 1, j = Math.ceil(list.length / per_page); i <= j; i++) {
    let li = createElement('LI', {}, ul);
    let a = createElement('A', {href: '#'}, li);
    a.innerHTML = i;
    pageLinkAction(a, list, i);
  }
  document.querySelector('.pagination a').classList.add('active');
}

showPage(list_container.children, 1);
appendPageLinks(list_container.children);
createSearch();


// Exceeds

function removeElement(selector) {
  const el = document.querySelector(selector);
  if (el) el.parentElement.removeChild(el);
}

function createSearch() {
  const search_container = document.querySelector('.page-header');
  const search_div = createElement('DIV', {class: 'student-search'}, search_container);
  const input = createElement('INPUT', {placeholder: 'Search for students...'}, search_div);
  const button = createElement('BUTTON', {}, search_div);
  button.innerHTML = 'Search';
  input.addEventListener('keyup', () => {
    const matches = [];
    searchActivity(matches, input.value.toLowerCase());
    showPage(matches, 1);
    appendPageLinks(matches);
  });
}

function searchActivity(matches, search_value) {
  [...list_container.children].forEach(val => {
    val.style.display = 'none';
    if (val.children[0].children[1].innerHTML.toLowerCase().includes(search_value)) matches.push(val);
  });
}