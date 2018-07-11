import { Bip39 } from './index';

const input = [226, 113, 155, 241, 113, 142, 50, 251, 133, 242, 85, 0, 250, 83, 163, 160, 190, 251, 68, 241, 127, 42, 99, 229, 30, 27, 226, 21, 236, 180, 93, 158];
const expectedWords = [1811,1126,2018,1816,1817,1006,190,597,7,1684,1863,523,1917,1299,1583,1834,799,327,1079,1569,758,721,947,1750];
const expectedSeed = 'c72f78aa8c1d1037a1fa77409b29a5a1f32d4d962b2c0af96c48c098dff461daefed23f8339c3601649c7658827bae2e8c1054b0a26c88df8826db3eb9900030';

const getByteArrayFromWords = (words) => {
  const bytes = [];
  return bytes;
};

describe("bytes array", () => {

  it("convert to seed", () => {
    const bip39 = new Bip39('en');

    const words = bip39.toMnemonicIndexes(input);
    expect(words.length).toEqual(24); // ensure we have 24 of the words

    const wordsLessThan2048 = words.filter(w => (w < 2048));
    expect(wordsLessThan2048.length).toEqual(words.length);

    console.log(JSON.stringify(words));
    expect(bip39.checkMnemonicIndexes(words)).toEqual(true);

    // 

  });

});
