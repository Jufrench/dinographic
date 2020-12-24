export function test() {
    console.log('yo yo yo');
}

/**
 * Creates HTML elements
 * @param {string} type 
 * @param {array of strings} classes 
 */
export const createDomEl = (type) => {
    const el = document.createElement(type);
    // el.classList = classes;

    return el;
};