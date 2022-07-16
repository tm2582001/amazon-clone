const classes = (classes)=> {
    const element = document.getElementsByClassName(classes);
    if(element) return element;
    throw new Error(`Please check your ${classes} class and make sure it's typed correctly`);
}

export default classes;
