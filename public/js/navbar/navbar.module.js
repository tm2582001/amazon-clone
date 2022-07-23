import id from '../selectors/id-selector.module.js';
import classes from '../selectors/class-selector.module.js';
import updateSuggestionText from './suggestion.module.js';
import { showSuggestionBox, hideSuggestionBox } from './suggestion.module.js';

const navSearch = classes('nav-search')[0];
const searchOption = classes('search-options')[0];
const selectionText = classes('selection-text')[0];
const selectionBox = classes('selection-box')[0];
const navSearchField = classes('nav-search-field')[0];
const searchButtonDiv = classes('search-button-div')[0];
const submitSearch = classes('submit-search')[0];

searchOption.addEventListener('change',(e)=>{
    // console.log(e.target.value);
    selectionText.textContent = searchOption.value;
    navSearchField.focus();
});

searchOption.addEventListener('focus',()=>{
    selectionBox.classList.add('active-nav');
});

searchOption.addEventListener('blur',()=>{
    selectionBox.classList.remove('active-nav');
});

navSearchField.addEventListener('focus',()=>{
    navSearch.classList.add('active-nav')
    showSuggestionBox();
});

navSearchField.addEventListener('blur',()=>{
    navSearch.classList.remove('active-nav');
    hideSuggestionBox();
});

submitSearch.addEventListener('focus',()=>{
    searchButtonDiv.classList.add('active-nav');
});

submitSearch.addEventListener('blur',()=>{
    searchButtonDiv.classList.remove('active-nav');
});


navSearchField.addEventListener('input',updateSuggestionText);
