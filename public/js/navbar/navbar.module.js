import id from '../selectors/id-selector.module.js';
import classes from '../selectors/class-selector.module.js';
import debounce from '../utils/debounce.module.js';

const navSearch = classes('nav-search')[0];
const searchOption = classes('search-options')[0];
const selectionText = classes('selection-text')[0];
const selectionBox = classes('selection-box')[0];
const navSearchField = classes('nav-search-field')[0];
const searchButtonDiv = classes('search-button-div')[0];
const submitSearch = classes('submit-search')[0];
const suggestionBox = classes('suggestion-box')[0];
const suggestionBoxWrapper = classes('suggestion-box-warapper')[0];

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
    suggestionBoxWrapper.style.display = "block";
});

navSearchField.addEventListener('blur',()=>{
    navSearch.classList.remove('active-nav');
    suggestionBoxWrapper.style.display = "none";
});

submitSearch.addEventListener('focus',()=>{
    searchButtonDiv.classList.add('active-nav');
});

submitSearch.addEventListener('blur',()=>{
    searchButtonDiv.classList.remove('active-nav');
});


// !!! TODO - Refactor code complete changeSearchText

const changeSearchtext = ()=>{
    const currentIndex = 0;
    return (suggestions,move)=>{
        
    }
}

const displaySuggestionText = (suggestions)=>{
    console.log(suggestions);
    suggestionBox.innerHTML = '';
    suggestions.map((suggestion)=>{
        suggestionBox.insertAdjacentHTML("beforeend",
            `<div id=${suggestion._id} class="suggested-item">
                <span class="suggestion-text">${suggestion.name}</span>
            </div>`
        )
    })
    
}

const getSuggestion = async(e)=>{
    try{
        const searchTerm = e.target.value?.trimStart();
        console.log(searchTerm);
        if(searchTerm){
            const res = await fetch(`/api/search?search=${searchTerm}&cat=All Category`);
            if(res.ok){
                const data = await res.json();
                displaySuggestionText(data)
            }
        }else{
            suggestionBox.innerHTML = '';
        }
    }catch(e){
        console.log(e);
    }
}

const updateSuggestionText = debounce(getSuggestion);

navSearchField.addEventListener('input',updateSuggestionText);
