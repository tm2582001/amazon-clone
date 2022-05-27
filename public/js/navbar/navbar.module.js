import {id,classes} from '../index.module.js';

const searchOption = classes('search-options')[0];
const selectionText = classes('selection-text')[0];
const selectionBox = classes('selection-box')[0];

searchOption.addEventListener('change',()=>{
    selectionText.textContent = searchOption.value;
});

searchOption.addEventListener('focus',()=>{
    selectionBox.classList.add('active-nav');
})


searchOption.addEventListener('blur',()=>{
    selectionBox.classList.remove('active-nav');
})