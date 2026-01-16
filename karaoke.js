async function startMic(){
  const stream = await navigator.mediaDevices.getUserMedia({audio:true});
  const ctx = new AudioContext();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  const source = ctx.createMediaStreamSource(stream);
  source.connect(analyser);

  const data = new Uint8Array(analyser.frequencyBinCount);
  const canvas = document.getElementById("visualizer");
  const c = canvas.getContext("2d");

  function draw(){
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(data);
    c.clearRect(0,0,canvas.width,canvas.height);
    let x=0;
    data.forEach(v=>{
      const h=v/2;
      c.fillStyle="#ff00ff";
      c.fillRect(x,canvas.height-h,4,h);
      x+=6;
    });
  }
  draw();
}
