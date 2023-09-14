const ALL_OPERATORS = ['*','/','+','-','.','%'];
const BINARY_OPERATORS = ['*','/','%'];

const calculator = document.querySelector('.calculator')

const buttonTheme = document.querySelector('.calculator__header-button')
const imageTheme = buttonTheme.querySelector('img')

const condition = document.querySelector('.calculator__condition')
const result = document.querySelector('.calculator__result')

const itemsWrapper = document.querySelector('.calculator__items')

const calculate = event => {
  const conditionLastChar = condition.innerText.at(-1);
  const conditionFirstChar = condition.innerText.at(0);

  if(condition.innerText.length > 20){
    condition.innerText = ''
  }

  const value = event.target.innerText;

  if (!event.target.classList.contains('calculator__item')) {
    return
  }

  switch (value) {
    case 'C': {
      condition.innerText = ''
      result.innerText = ''

      break;
    }

    case '=': {
      if (condition.innerText.search(/[^0-9*/+-.%]/mi) !== -1) {
        return
      }

      if(condition.innerText === '' || ALL_OPERATORS.includes(conditionLastChar)) {
        condition.innerText = ''
        result.innerText = 0
        return
      }

      result.innerText = BINARY_OPERATORS.includes(conditionFirstChar) ? 0 : eval(condition.innerText)
      condition.innerText = ''
      break;
    }

    default:
      if(ALL_OPERATORS.includes(conditionLastChar) && ALL_OPERATORS.includes(value)){
          condition.innerText = condition.innerText.slice(0,condition.innerText.length -1)
      }
      condition.innerText += value
      result.innerText = 0
  }
}

itemsWrapper.addEventListener('click', calculate)


const toggleTheme = () => {
  calculator.classList.toggle('calculator__light-theme')
  calculator.classList.toggle('calculator__dark-theme')

  imageTheme.src = `/assets/icons/${imageTheme.src.includes('moon.svg') ? "sun" : "moon"}.svg`
}

buttonTheme.addEventListener('click', toggleTheme)