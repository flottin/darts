/*
 * class BufferLoader
 * load the sound as a buffer 
 */
function BufferLoader( urlList, callback) {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    if (!this.context.createGain)
      this.context.createGain = this.context.createGainNode;
    if (!this.context.createDelay)
      this.context.createDelay = this.context.createDelayNode;
    if (!this.context.createScriptProcessor)
      this.context.createScriptProcessor = this.context.createJavaScriptNode;

    this.urlList      = urlList;
    this.onload       = callback;
    this.bufferList   = new Array();
    this.loadCount    = 0;
    this.source       = null ;
    this.soundVolume  = 1;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
};

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
};


/*
 * objet RapidSoundSample
 * manage the sound
 */
function RapidSoundsSample(theSound, soundVolume = 1) {
  var ctx = this;
  var loader = new BufferLoader( [theSound], onLoaded);
this.context = loader.context
  function onLoaded(buffers) {
    ctx.buffers = buffers;
  };
  this.soundVolume = soundVolume;

  loader.load();

}

/*
* start sound
*/
RapidSoundsSample.prototype.shootRound = function() {
    var time = this.context.currentTime;
    this.source = this.context.createBufferSource();
    var gain = this.context.createGain();
    gain.gain.value = this.soundVolume;
    this.source.buffer = this.buffers[0];
    this.source.connect(gain);
    gain.connect(this.context.destination);
    this.source.start(0)
    
}

/*
 * stop current sound
 */
RapidSoundsSample.prototype.stop = function(audioSrc) {
  this.source.stop();
}

