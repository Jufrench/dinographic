import * as Helper from './helper.js';

// Start http-server w/ "npx http-server"
// See link for http-server documentation: https://github.com/http-party/http-server

// TODO:


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

// Generate Tiles for each Dino in Array
const makeTiles = _array => {
    console.log('%cMaking tiles...', 'color: #fc3d39');
    console.log(_array);
    const elementsArr = _array.map(item => {
        return Helper.createDomEl('DIV');
    });

    console.log(elementsArr);

    return elementsArr;
};

// Add tiles to DOM
const addTilesToDOM = _dinosParam => {
    document.getElementById('dino-compare').style.display = 'none';

    const domGrid = document.getElementById('grid');

    _dinosParam.forEach(dino => {
        domGrid.innerHTML += dino.species;
    });
};

// Remove form from screen
const removeFormFromScreen = () => {

};

const validateForm = () => {
    console.log('%cTODO: Validate Form', 'color: gold');
};


function init() {

    // Use IIFE to get human data from form
    // Revealing Module Pattern
    const human = (function getHumanData() {
        let name, feet, inches, weight, diet;

        function validateForm() {

        }

        name = document.getElementById('name').value;
        feet = parseInt(document.getElementById('feet').value);
        inches = parseInt(document.getElementById('inches').value);
        weight = parseInt(document.getElementById('weight').value);
        diet = document.getElementById('diet').value;

        return {
            name,
            feet,
            inches,
            weight,
            diet
        }
    })();

    dinosArray.forEach(dino => {
        dino.compareHeight(human);
        dino.compareWeight(human);
        dino.compareDiet(human);
        dino.addFacts();
        // console.log(dino.facts);
    });

    // addTilesToDOM(dinosArray);

    makeTiles(dinosArray);
}

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', init);

