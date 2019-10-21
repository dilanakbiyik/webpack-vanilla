import data from './data';

import './index.scss';


const SELECTORS = {
  LIST: 'list',
  COLOURS: 'colour',
  SELECTED_COLOUR: 'selected-colour',
};

/**
 * Convert object map to arrayList
 * @param keyData
 * @returns {*[]}
 */
function createList(keyData) {
  const keys = Object.keys(keyData);
  return keys.map((key) => keyData[key]);
}

function loadColorOptions(colours) {
  return `
    <div class="colour-options">        
        ${colours.map((colour) => `<div class="${SELECTORS.COLOURS}" data-id="${colour.id}" style="background: ${colour.rgb}"></div>`).join('\n')}
    </div>
`;
}

function loadSelectedColour(selectedColour, acc) {
  return `
      <img src="${selectedColour.src}" />
      <span class="main-label">${acc.label}</span>
      <span class="colour-label">${selectedColour.label}</span>
      <span class="price">${`${selectedColour.currency} ${selectedColour.price}`}</span>
    `;
}

class Accessories {
  constructor() {
    this.onClickColour = this.onClickColour.bind(this);

    this.accesorries = createList(data);
    this.accesorries.forEach((accessory) => {
      // eslint-disable-next-line no-param-reassign
      accessory.colours = createList(accessory.colours);
    });

    this.createDOM();
    this.initSelectors();
    this.initListeners();
  }

  initSelectors() {
    this.colourArea = document.querySelector(`.${SELECTORS.LIST}`);
    this.coloursDOMList = this.colourArea.querySelectorAll(`.${SELECTORS.COLOURS}`);
  }

  initListeners() {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.coloursDOMList.length; i++) {
      const colourDOM = this.coloursDOMList[i];
      colourDOM.addEventListener('click', this.onClickColour);
    }
  }

  onClickColour(event) {
    const accId = event.currentTarget.parentElement.parentElement.dataset.id;
    const selectedColourId = event.currentTarget.dataset.id;
    const selectedAcc = this.accesorries.find((acc) => acc.id === accId);
    const selectedColour = selectedAcc.colours.find((colour) => colour.id === selectedColourId);
    this.colourArea
      .querySelector(`.acc[data-id="${accId}"] .${SELECTORS.SELECTED_COLOUR}`)
      .innerHTML = loadSelectedColour(selectedColour, selectedAcc);
  }

  createDOM() {
    document.querySelector('body').innerHTML = this.loadAccArea();
  }

  loadAccArea() {
    return `
      <div class="${SELECTORS.LIST}">
        ${this.loadAccList()}
      </div>
    `;
  }

  loadAccList() {
    const list = this.accesorries.map((acc) => {
      const selectedColour = acc.colours[0];
      return `
      <div class="acc" data-id="${acc.id}">
        <div class="selected-colour">
            ${loadSelectedColour(selectedColour, acc)}
        </div>
        ${loadColorOptions(acc.colours)}
      </div>
    `;
    });
    return list.join('\n');
  }
}


export default Accessories;
