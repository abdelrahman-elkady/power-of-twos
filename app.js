const q = document.querySelector.bind(document);
let voices = [];

window.speechSynthesis.onvoiceschanged = function() {
  voices = window.speechSynthesis.getVoices();
}

const powerOfTwo = n => (n > 1) && ((n & (n - 1)) === 0);

function speak() {
  if ('speechSynthesis' in window) {
    const number = parseInt(q('#number').value);

    if (powerOfTwo(number) && !isNaN(number)) {
      let message = `${number} which is 2`;

      for (var i = 4; i <= number; i *= 2) {
        message += ' times 2 ';
      }

      const voiceMessage = new SpeechSynthesisUtterance(message);
      voiceMessage.voice = voices.filter(function(voice) {
        return voice.name == 'Google UK English Male';
      })[0];

      window.speechSynthesis.speak(voiceMessage);

    }
  } else {
    console.log('Something went wrong');
  }

}

q('#speak_button').addEventListener('click', speak);

q('#number').addEventListener('input', event => {
  const data = event.target.value;

  if (!powerOfTwo(data)) {
    q('#power_validation').classList.remove('hidden');
  } else {
    q('#power_validation').classList.add('hidden');
  }
});
