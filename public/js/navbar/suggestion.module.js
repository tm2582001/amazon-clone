import classes from '../selectors/class-selector.module.js';
import debounce from '../utils/debounce.module.js';

const suggestionBox = classes('suggestion-box')[0];
const suggestionBoxWrapper = classes('suggestion-box-warapper')[0];


const hideSuggestionBox = ()=>suggestionBoxWrapper.style.display = "none";
const showSuggestionBox = ()=>suggestionBoxWrapper.style.display = "block";

// !!! TODO - complete changeSearchText

const changeSearchtext = ()=>{
    const currentIndex = 0;
    return (suggestions,movement)=>{
        
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

export default updateSuggestionText;
export {showSuggestionBox,hideSuggestionBox};