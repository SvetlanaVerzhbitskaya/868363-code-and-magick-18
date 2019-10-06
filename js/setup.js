'use strict';
var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoat = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyes = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];
var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var fragment = document.createDocumentFragment();

userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var getRandom = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getMoreWizards = function (arr) {
  for (var i = 0; i < 4; i++) {
    arr[i] = {
      name: getRandom(wizardNames) + ' ' + getRandom(wizardSurnames),
      coatColor: getRandom(wizardCoat),
      eyesColor: getRandom(wizardEyes)
    };
  }
  return(arr);
};

getMoreWizards(wizards);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createWizards = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  similarListElement.appendChild(fragment);
}

createWizards (wizards);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
