let audioCtx;
let analyser;
let dataArray;
let source;

async function startMic() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;

    source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);

    dataArray = new Uint8Array(analyser.frequencyBinCount);

    draw();
  } catch (err) {
    alert("Mic permission denied");
  }
}

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  const canvas = document.getElementById("visualizer");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / dataArray.length) * 2.5;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i] / 2;
    ctx.fillStyle = "#ff00ff";
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}
