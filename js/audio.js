/*
 * Copyright 2013 Boris Smus. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Start off by initializing a new context.
context = new (window.AudioContext || window.webkitAudioContext)();

if (!context.createGain)
  context.createGain = context.createGainNode;
if (!context.createDelay)
  context.createDelay = context.createDelayNode;
if (!context.createScriptProcessor)
  context.createScriptProcessor = context.createJavaScriptNode;


function BufferLoader(context, urlList, callback) {
  this.context      = context;
  this.urlList      = urlList;
  this.onload       = callback;
  this.bufferList   = new Array();
  this.loadCount    = 0;
  this.source       = null ;
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

/**
 * init the sound
 */
function RapidSoundsSample(context, theSound = 'medias/dart2.mp3', soundVolume = 1) {
  var ctx = this;
  var loader = new BufferLoader(context, [theSound], onLoaded);

  function onLoaded(buffers) {
    ctx.buffers = buffers;
  };
  soundVolume = soundVolume;

  loader.load();

}

/**
* start sound
*/
RapidSoundsSample.prototype.shootRound = function(soundVolume = 1) {
    var time = context.currentTime;
    this.source = context.createBufferSource();
    var gain = context.createGain();
    gain.gain.value = soundVolume;
    this.source.buffer = this.buffers[0];
    this.source.connect(gain);
    gain.connect(context.destination);
    this.source.start(0)
    
}

/**
 * stop current sound
 */
RapidSoundsSample.prototype.stop = function(audioSrc) {
  this.source.stop();
}

