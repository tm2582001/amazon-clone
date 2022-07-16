const id = (id)=>{
    const element = document.getElementById(id);
    if(element) return element;
    throw new Error(`Please check your ${id} id and make sure it's typed correctly`);
}

export default id;