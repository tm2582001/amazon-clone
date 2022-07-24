import classes from '../selectors/class-selector.module.js';
import debounce from '../utils/debounce.module.js';
import query from '../selectors/query-selector.module.js';

const navSearchField = classes('nav-search-field')[0];
const suggestionBox = classes('suggestion-box')[0];
const suggestionBoxWrapper = classes('suggestion-box-warapper')[0];

const hideSuggestionBox = ()=>suggestionBoxWrapper.style.display = "none";
const showSuggestionBox = ()=>suggestionBoxWrapper.style.display = "block";


const changeSearchtext = (suggestions=[])=>{
    let currentIndex = 0;
    return (position)=>{
        // console.log(currentIndex,suggestions);
        if(!suggestions.length) return;

        if(position === "decrease"){
            if(currentIndex===0){
                currentIndex = suggestions.length-1;
            }else{
                currentIndex--;
            }
            console.log(currentIndex,suggestions);
        }
        
        if(position=== "increase"){
            if(currentIndex===suggestions.length-1){
                currentIndex = 0
            }else{
                currentIndex++;
            }
            console.log(currentIndex,suggestions);
        }

        const selectedSuggestion =  suggestions[currentIndex]
        navSearchField.value = selectedSuggestion?.name || selectedSuggestion;
        classes("selected-suggestion-item")[0]?.classList.remove("selected-suggestion-item")
        if(selectedSuggestion._id){
            query(`[aria-label="${selectedSuggestion._id}"]`).classList.add("selected-suggestion-item");
        } 

    }
}

let changeText = changeSearchtext();


const addSearchFieldListener = ()=>{
    if(!navSearchField.onkeydown){
        navSearchField.onkeydown= (e)=>{
            const {keyCode} = e;
            if(keyCode===38){
                changeText("decrease");
            }
            if(keyCode===40){
                changeText("increase");
            }
            console.log(e);
        }
    }
}

const removeSearchFieldListener = ()=>navSearchField.onkeydown= null;


const displaySuggestionText = (suggestions)=>{
    console.log(suggestions);
    suggestionBox.innerHTML = '';
    suggestions.map((suggestion)=>{
        suggestionBox.insertAdjacentHTML("beforeend",
            `<div class="suggested-item" role="button" aria-label="${suggestion._id}">
                <span class="suggestion-text">${suggestion.name}</span>
            </div>`
        )
    })

    const suggestionItem = classes('suggested-item')
 
    for(let i=0;i<suggestionItem.length;i++){
        suggestionItem[i].onmousedown= (e)=>e.preventDefault();  //we can also use this.clickedElemnt = items and then check if this is clicked then doesn't close this
        suggestionItem[i].onclick = ()=>window.location.href = `search?cat=All Category&search=${suggestions[i]?.name}`; 
    }

}


const getSuggestion = async(e)=>{
    try{
        const searchTerm = e.target.value?.trimStart();
        console.log(searchTerm);
        if(searchTerm){
            const res = await fetch(`/api/search?search=${searchTerm}&cat=All Category`);
            if(res.ok){
                const data = await res.json();
                displaySuggestionText(data);
                changeText = changeSearchtext([searchTerm,...data]);
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
export {showSuggestionBox,hideSuggestionBox,removeSearchFieldListener,addSearchFieldListener};