var canvas = document.getElementsByTagName("canvas")[0];
var canvasContext = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (window.innerHeight * .35);

var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var audio = document.getElementsByTagName("audio")[0];
audio.crossOrigin = "anonymous";

var source = audioContext.createMediaElementSource(audio);
var analyser = audioContext.createAnalyser();

source.connect(analyser);
analyser.connect(audioContext.destination);

var bufferLength = analyser.frequencyBinCount;
var frequencyData = new Uint8Array(bufferLength);

function visualizeRender() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(frequencyData);

  var frequencyWidth = canvas.width / bufferLength, frequencyHeight = 0, x = 0;

  for (var increment = 0; increment < bufferLength; increment++) {
    frequencyHeight = frequencyData[increment] * (canvas.height * 0.004);
    canvasContext.fillStyle = "rgb(" + (Math.ceil((Math.floor(Math.random() *256) * 150))) + ", " + (Math.floor(Math.random() *100)) + " , " + 0 + ")";
    canvasContext.fillRect(
      x,
      canvas.height - frequencyHeight,
      frequencyWidth,
      frequencyHeight
    );
    x += frequencyWidth + 4;
  }

  call = requestAnimationFrame(visualizeRender);
}

var isPlaying = false;
var controls = document.getElementById("Controls");

controls.addEventListener("click", function() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    controls.textContent = "Pause";
    controls.style.background = "#F44336";
    audio.play();
    visualizeRender();
  } else {
    controls.textContent = "Play";
    controls.style.background = "#4CAF50";
    audio.pause();
    cancelAnimationFrame(call);
  }
});


// var request = new XMLHttpRequest();

// request.open(
//   "GET",
//   "https://s3-us-west-2.amazonaws.com/harriscarney/audio/Foliation.mp3",
//   true
// );
// request.responseType = "blob";

// request.onload = function() {
//   audio.src = window.URL.createObjectURL(request.response)";
//   console.log(request.response);
// };

// request.send();

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - (window.innerHeight * .15);
});

// export default masterVisualizer;