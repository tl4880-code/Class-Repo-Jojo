const animals = {
  fox: {
    name: 'Fox',
    product: 'fur trim',
    hint: 'Hover over the surface. Click to wake it.',
    awake: 'The surface breathes. It remembers warmth.',
    memory: 'A fox once crossed the edge of the woods.',
    voices: [
      'The fur was never made for a shelf.',
      'It knew rain before it knew a price.',
      'Look, then leave space.'
    ]
  },
  mink: {
    name: 'Mink',
    product: 'coat',
    hint: 'Come closer. Shine is not a reason to exist.',
    awake: 'The scan passes through. The body is still not a product.',
    memory: 'A mink once moved close to water.',
    voices: [
      'It was not born for a coat.',
      'Its shine belonged to a living body.',
      'Luxury can hide a winter that was lost.'
    ]
  },
  seal: {
    name: 'Seal',
    product: 'leather',
    hint: 'Pause. A skin can hold back sea and cold.',
    awake: 'The outline flickers, then becomes still again.',
    memory: 'Sea water once rested on this skin.',
    voices: [
      'It knew how to keep warm in water.',
      'A product name cannot finish a life.',
      'To look is not to own.'
    ]
  }
};

const specimen = document.getElementById('specimen');
const touchButton = document.getElementById('touch-button');
const animalName = document.getElementById('animal-name');
const productName = document.getElementById('product-name');
const gestureText = document.getElementById('gesture-text');
const memoryText = document.getElementById('memory-text');
const heardText = document.getElementById('heard-text');
const listenButton = document.getElementById('listen-button');
const animalButtons = [...document.querySelectorAll('.animal-option')];

let activeAnimal = 'fox';
let isAwake = false;
let voiceIndex = 0;

function updateAnimal(animalKey) {
  activeAnimal = animalKey;
  voiceIndex = 0;
  const animal = animals[animalKey];

  document.body.dataset.animal = animalKey;
  animalName.textContent = animal.name;
  productName.textContent = animal.product;
  gestureText.textContent = isAwake ? animal.awake : animal.hint;
  memoryText.textContent = animal.memory;
  heardText.textContent = 'A quiet line lives here.';

  animalButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.animal === animalKey));
  });
}

function setAwake(nextState) {
  isAwake = nextState;
  const animal = animals[activeAnimal];
  document.body.classList.toggle('is-awake', isAwake);
  specimen.setAttribute('aria-pressed', String(isAwake));
  touchButton.textContent = isAwake ? 'Let it rest' : 'Touch the surface';
  gestureText.textContent = isAwake ? animal.awake : animal.hint;
}

animalButtons.forEach((button) => {
  button.addEventListener('click', () => updateAnimal(button.dataset.animal));
});

specimen.addEventListener('pointerenter', () => document.body.classList.add('forest-mode'));
specimen.addEventListener('pointerleave', () => document.body.classList.remove('forest-mode'));
specimen.addEventListener('focus', () => document.body.classList.add('forest-mode'));
specimen.addEventListener('blur', () => document.body.classList.remove('forest-mode'));
specimen.addEventListener('click', () => setAwake(!isAwake));
touchButton.addEventListener('click', () => setAwake(!isAwake));

listenButton.addEventListener('click', () => {
  const voices = animals[activeAnimal].voices;
  heardText.textContent = voices[voiceIndex % voices.length];
  voiceIndex += 1;
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isAwake) setAwake(false);
});

updateAnimal(activeAnimal);
