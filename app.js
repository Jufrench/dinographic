import * as Helper from './helper.js';

// Start http-server w/ "npx http-server"
// See link for http-server documentation: https://github.com/http-party/http-server

const getDinoData = async () => {
    const fetchedData = await fetch('http://127.0.0.1:8080/dino.json');
    const data = await fetchedData.json();
    return data.Dinos;
}

// Create Dino Constructor
function DinoConstructor(species, weight, height, diet, where, when, facts) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.facts = facts;
}

const dinosArray = [];

// Create Dino Objects
getDinoData().then(data => {
    const dinos = data;
    
    dinos.forEach(dinoItem => {
        const dinoObj = new DinoConstructor(
            dinoItem.species,
            dinoItem.weight,
            dinoItem.height,
            dinoItem.diet,
            dinoItem.where,
            dinoItem.when,
            dinoItem.facts
        );

        dinosArray.push(dinoObj);
    });

}).catch(err => {
    console.error(err);
});

//Create at least 3 methods that compare dino data to human data

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
DinoConstructor.prototype.compareHeight = function(_param) {
    const humanHeight = (_param.feet * 12) + _param.inches;
    let fact;

    if (this.height < humanHeight) {
        fact = `The ${this.species} is ${(humanHeight / this.height).toFixed(2)} times smaller than ${_param.name}`;
    } else {
        fact = `The ${this.species} is ${(this.height / humanHeight).toFixed(2)} times larger than ${_param.name}`;
    }

    this.facts.push(fact);
}

// Create Dino Compare Method 2
DinoConstructor.prototype.compareWeight = function(_param) {
    let fact;

    if (this.weight < _param.weight) {
        fact = `The ${this.species} is ${(_param.weight / this.weight).toFixed(2)} times lighter than ${_param.name}`;
    } else {
        fact = `The ${this.species} is ${(this.weight / _param.weight).toFixed(2)} times heavier than ${_param.name}`;
    }

    this.facts.push(fact);
}

// Create Dino Compare Method 3
DinoConstructor.prototype.compareDiet = function(_param) {
    const dinoArticle = this.diet === 'carnivore' ? 'a' : 'an';
    const humanArticle = _param.diet === 'carnivore' ? 'a' : 'an';
    const fact = `The ${this.species} is ${dinoArticle} ${this.diet}, while ${_param.name} is ${humanArticle} ${_param.diet}`;

    this.facts.push(fact);
}

// Add 2 facts to the Dino object
DinoConstructor.prototype.addFacts = function() {
    const fact1 = `Lived during the ${this.when} era`;
    const fact2 = `Regions: ${this.where}`;

    this.facts.push(fact1);
    this.facts.push(fact2);
}

DinoConstructor.prototype.createContent = function() {
    const el = document.createElement('DIV');
    let content = `<h3>${this.species}</h3>`;

    el.classList.add('grid-item');
    content += `<img src="images/${this.species}.png" />`;
    el.innerHTML = content;

    return el;
}

const createDinoHTML = (_array) => {
    // console.log(_array);
    
    const htmlElArray = _array.map(dino => {
        return dino.createContent();
    });

    return htmlElArray;
};

function updateDinos(_array, _human) {
    _array.forEach(dino => {
        dino.compareHeight(_human);
        dino.compareWeight(_human);
        dino.compareDiet(_human);
        dino.addFacts();
    });

    return _array;
}

// Generate Tiles for each Dino in Array
const makeTiles = _array => {
    // console.log(_array);
    // const elementsArr = _array.map(item => {
    //     return Helper.createDomEl({ type: 'DIV', classes: ['grid-item'] });
    //     // return item.createContent();
    // });


    // console.log(elementsArr);

    // return elementsArr;
};

// Add tiles to DOM
const addTilesToDOM = _array => {
    const domGrid = document.getElementById('grid');

    document.getElementById('dino-compare').style.display = 'none';

    console.log(_array);

    _array.forEach(arrItem => {
        domGrid.insertAdjacentElement('afterbegin', arrItem);
    });
};

const addHumanToTilesArray = (_array, _human) => {
    _array.splice(4, 0, _human);
    return _array;
};

// Remove form from screen
const removeFormFromScreen = () => {

};

const validateForm = () => {
    console.log('%cTODO: Validate Form', 'color: gold');
};


function init() {

    // Use IIFE to get human data from form
    const human = (function getHumanData() {
        // Revealing Module Pattern
        let name, feet, inches, weight, diet;

        function validateForm() {

        }

        name = document.getElementById('name').value;
        feet = parseInt(document.getElementById('feet').value);
        inches = parseInt(document.getElementById('inches').value);
        weight = parseInt(document.getElementById('weight').value);
        diet = document.getElementById('diet').value;

        let el = document.createElement('DIV');
        let content = `<h3>${name}</h3>`;

        el.classList.add('grid-item');
        el.innerHTML = content;
        
        return el;

        // return {
        //     name,
        //     feet,
        //     inches,
        //     weight,
        //     diet
        // }
    })();

    const dinosArrayUpdated = updateDinos(dinosArray, human);
    // console.log(dinosArrayUpdated);

    const dinosHtmlArray = createDinoHTML(dinosArrayUpdated);
    // console.log(dinosHtmlArray);

    const dinosArrayWithHuman = addHumanToTilesArray(dinosHtmlArray, human);
    // console.log(dinosArrayWithHuman);

    addTilesToDOM(dinosArrayWithHuman);
}

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', init);

