var voices = [];
window.speechSynthesis.onvoiceschanged = function() {
  voices = window.speechSynthesis.getVoices();
}


function run() {

  if ('speechSynthesis' in window) {
    var number = parseInt($('#number').val());

    if (powerOfTwo(number) && !isNaN(number)) {
      var message = "" + number + " which is 2";
      for (var i = 4; i <= number; i *= 2) {
        message += " times 2 ";
      }

      var msg = new SpeechSynthesisUtterance(message);
      msg.voice = voices.filter(function(voice) {
        return voice.name == 'Google UK English Male';
      })[0];

      window.speechSynthesis.speak(msg);

    }
  } else {
    console.log("Something went wrong");
  }

}

function powerOfTwo(n) {
  return (n > 1) && ((n & (n - 1)) == 0);
}

$('#number').on('input', function() {
  var data = $(this).val();
  if (!powerOfTwo(data)) {
    $("#power_validation").removeClass('hidden');
  } else {
    $("#power_validation").addClass('hidden');
  }
});
