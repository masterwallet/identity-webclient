/*
 Based on:
 https://github.com/pointbiz/bitaddress.org/blob/master/src/securerandom.js
*/

export function SecureRandom() {
  this.pool = [];
  this.pptr = 0;
  // Pool size must be a multiple of 4 and greater than 32.
  // An array of bytes the size of the pool will be passed to init()
  this.poolSize = 128; // 32*4
  this.numWords = 24;

  this.iteration = 0;
  this.required = 1024;

  this.copy = function() {
    const co = new SecureRandom();
    co.pool = this.pool.slice();
    co.pptr = this.pptr;
    co.numWords = this.numWords;
    co.poolSize = this.poolSize;
    co.iteration = this.iteration;
    co.required = this.required;
    return co;
  };

  // Mix in the current time (w/milliseconds) into the pool
  // NOTE: this method should be called from body click/keypress event handlers to increase entropy
  this.seedTime = function () {
    this.seedInt(new Date().getTime());
  };

  // Mix in a 32-bit integer into the pool
  this.seedInt = function (x) {
    this.seedInt8(x);
    this.seedInt8((x >> 8));
    this.seedInt8((x >> 16));
    this.seedInt8((x >> 24));
  };

  // Mix in a 16-bit integer into the pool
  this.seedInt16 = function (x) {
    this.seedInt8(x);
    this.seedInt8((x >> 8));
  };

  // Mix in a 8-bit integer into the pool
  this.seedInt8 = function (x) {
    this.pool[this.pptr++] ^= x & 255;
    if (this.pptr >= this.poolSize) this.pptr -= this.poolSize;
    this.iteration ++;
  };

  this.getProgress = function() {
    return parseInt(this.iteration * 100 / this.required, 10);
  };

  // this function is used random indexes of N words
  // for further verification
  this.getRandomIndexes = function (n){
    const arr = [];
    do {
      const rand = parseInt(this.numWords * Math.random(), 10);
      if (arr.indexOf(rand) === -1) arr.push(rand);
    } while (arr.length < n);
    return arr;
  }

  this.getWordArray = function() {
    const a = [];
    const data = this.pool;
    if (data.length === this.poolSize) {
      console.log('this.pool = ', this.pool);
      for (let i = 0; i<data.length/4; i++) {
          let v = 0;
          v += data[i*4 + 0] << 8 * 3;
          v += data[i*4 + 1] << 8 * 2;
          v += data[i*4 + 2] << 8 * 1;
          v += data[i*4 + 3] << 8 * 0;
          a.push(v);
      }
      console.warn('a=', a);
    }
    return a;
  }

}
