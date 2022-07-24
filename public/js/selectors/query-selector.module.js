const query = (query)=>{
    const element = document.querySelector(query);
    if(element) return element;
    throw new Error(`Please check your ${query} query and make sure it's typed correctly`);
}

export default query;