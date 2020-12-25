
/**
 * Creates HTML elements
 * @param {object} type 
 * _params.type = element type
 * _params.classes = classes to add
 */
export const createDomEl = (_params) => {
    const el = document.createElement(_params.type);
    let content;

    if (_params.classes !== undefined) {
        el.classList.add(_params.classes);
    }
    
    // if 


    return el;
};

export const AddText = (_params) => {

};