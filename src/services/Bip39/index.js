/*
 * Copyright (c) 2013 Pavol Rusnak
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Javascript port from python by Ian Coleman
 *
 * Requires code from sjcl
 * https://github.com/bitwiseshiftleft/sjcl
 * 
 * Reference:
 * https://github.com/iancoleman/bip39
 */
import sjcl from './Sjcl';

var Bip39 = function(language, wordlist) {

    var PBKDF2_ROUNDS = 2048;
    var RADIX = 2048;

    var self = this;

    var hmacSHA512 = function(key) {
        var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha512);
        this.encrypt = function() {
            return hasher.encrypt.apply(hasher, arguments);
        };
    };

    function init() {
        if (wordlist.length != RADIX) {
            const err = 'Wordlist should contain ' + RADIX + ' words, but it contains ' + wordlist.length + ' words.';
            throw err;
        }
    }

    self.generate = function(strength) {
        strength = strength || 128;
        var r = strength % 32;
        if (r > 0) {
            throw 'Strength should be divisible by 32, but it is not (' + r + ').';
        }
        var hasStrongCrypto = 'crypto' in window && window['crypto'] !== null;
        if (!hasStrongCrypto) {
            throw 'Mnemonic should be generated with strong randomness, but crypto.getRandomValues is unavailable';
        }
        var buffer = new Uint8Array(strength / 8);
        var data = crypto.getRandomValues(buffer);
        return self.toMnemonic(data);
    }

    self.toMnemonicIndexes = function(byteArray) {
        if (byteArray.length % 4 > 0) {
            throw 'Data length in bits should be divisible by 32, but it is not (' + byteArray.length + ' bytes = ' + byteArray.length*8 + ' bits).'
        }

        //h = hashlib.sha256(data).hexdigest()
        const data = byteArrayToWordArray(byteArray);
        const hash = sjcl.hash.sha256.hash(data);
        const h = sjcl.codec.hex.fromBits(hash);
        // b is a binary string, eg '00111010101100...'
        //b = bin(int(binascii.hexlify(data), 16))[2:].zfill(len(data) * 8) + \
        //    bin(int(h, 16))[2:].zfill(256)[:len(data) * 8 / 32]
        //
        // a = bin(int(binascii.hexlify(data), 16))[2:].zfill(len(data) * 8)
        // c = bin(int(h, 16))[2:].zfill(256)
        // d = c[:len(data) * 8 / 32]
        const a = byteArrayToBinaryString(byteArray);
        const c = zfill(hexStringToBinaryString(h), 256);
        const d = c.substring(0, byteArray.length * 8 / 32);
        // b = line1 + line2
        const b = a + d;
        const result = [];
        const blen = b.length / 11;
        for (let i=0; i<blen; i++) {
            const idx = parseInt(b.substring(i * 11, (i + 1) * 11), 2);
            result.push(idx);
        }
        return result;
    }

    self.checkMnemonicIndexes = function(wordIndexes) {
        // idx = map(lambda x: bin(self.wordlist.index(x))[2:].zfill(11), mnemonic)
        const idx = [];
        for (let i = 0; i < wordIndexes.length; i++) {
            const wordIndex = wordIndexes[i];
            const binaryIndex = zfill(wordIndex.toString(2), 11);
            idx.push(binaryIndex);
        }
        const b = idx.join('');
        const l = b.length;
        //d = b[:l / 33 * 32]
        //h = b[-l / 33:]
        const d = b.substring(0, l / 33 * 32);
        const h = b.substring(l - l / 33, l);
        //nd = binascii.unhexlify(hex(int(d, 2))[2:].rstrip('L').zfill(l / 33 * 8))
        const nd = binaryStringToWordArray(d);
        //nh = bin(int(hashlib.sha256(nd).hexdigest(), 16))[2:].zfill(256)[:l / 33]
        const ndHash = sjcl.hash.sha256.hash(nd);

        const ndHex = sjcl.codec.hex.fromBits(ndHash);
        const ndBstr = zfill(hexStringToBinaryString(ndHex), 256);
        const nh = ndBstr.substring(0,l/33);
        return h == nh;
    }

    self.toSeed = function(mnemonic, passphrase) {
        passphrase = passphrase || '';
        mnemonic = self.joinWords(self.splitWords(mnemonic)); // removes duplicate blanks
        var mnemonicNormalized = self.normalizeString(mnemonic);
        passphrase = self.normalizeString(passphrase)
        passphrase = "mnemonic" + passphrase;
        var mnemonicBits = sjcl.codec.utf8String.toBits(mnemonicNormalized);
        var passphraseBits = sjcl.codec.utf8String.toBits(passphrase);
        var result = sjcl.misc.pbkdf2(mnemonicBits, passphraseBits, PBKDF2_ROUNDS, 512, hmacSHA512);
        var hashHex = sjcl.codec.hex.fromBits(result);
        return hashHex;
    }

    self.splitWords = function(mnemonic) {
        return mnemonic.split(/\s/g).filter(function(x) { return x.length; });
    }

    self.joinWords = function(words) {
        // Set space correctly depending on the language
        // see https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md#japanese
        var space = " ";
        if (language === 'jp' || language === "japanese") {
            space = "\u3000"; // ideographic space
        }
        return words.join(space);
    }

    self.normalizeString = function(str) {
        return str.normalize("NFKD");
    }

    function byteArrayToWordArray(data) {
        const a = [];
        for (var i=0; i<data.length/4; i++) {
            let v = 0;
            v += data[i*4 + 0] << 8 * 3;
            v += data[i*4 + 1] << 8 * 2;
            v += data[i*4 + 2] << 8 * 1;
            v += data[i*4 + 3] << 8 * 0;
            a.push(v);
        }
        return a;
    }

    function byteArrayToBinaryString(data) {
        let bin = "";
        for (let i=0; i<data.length; i++) {
            bin += zfill(data[i].toString(2), 8);
        }
        return bin;
    }

    function hexStringToBinaryString(hexString) {
        let binaryString = "";
        for (var i=0; i<hexString.length; i++) {
            binaryString += zfill(parseInt(hexString[i], 16).toString(2),4);
        }
        return binaryString;
    }

    function binaryStringToWordArray(binary) {
        const aLen = binary.length / 32;
        const a = [];
        for (var i=0; i<aLen; i++) {
            var valueStr = binary.substring(0,32);
            var value = parseInt(valueStr, 2);
            a.push(value);
            binary = binary.slice(32);
        }
        return a;
    }

    // Pad a numeric string on the left with zero digits until the given width
    // is reached.
    // Note this differs to the python implementation because it does not
    // handle numbers starting with a sign.
    function zfill(source, length) {
        source = source.toString();
        while (source.length < length) {
            source = '0' + source;
        }
        return source;
    }

    // skip the validation
    // init();
}

export {
    sjcl,
    Bip39
};
