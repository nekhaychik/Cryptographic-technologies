const NAME_STRING = 'Nekhaychik Irina Igorevna';
const TABLE_WIDTH = 5;
const PLAYFAIR_CIPHER_KEY = 'TABLE';

function encryptWithRoutePermutationCipher (str, width) {
  const table = [];
  let strIndex = 0;
  let result = '';

  for (let i = 0; i < Math.ceil(str.length / width); i++) {
    table[i] = [];
    for (let j = 0; j < width; j++) {
      if (str[strIndex]) {
        table[i].push(str[strIndex++]);
      } else {
        table[i].push('*');
      }
    }
  }

  for (let j = 0; j < width; j++) {
    for (let i = 0; i < table.length; i ++) {
      result += table[i][j];
    }
  }

  console.log(`Input string: ${NAME_STRING}`);
  console.log(`Table: `, table);

  return result;
}

function createTableForPlayfairCipher (key) {
  const table = [];
  let charCode = 65;
  const keyArr = key.split('');

  for (let i = 0; i < 5; i++) {
    table[i] = [];
    for (let j = 0; j < 5; j++) {
      if (i === 0) {
        table[i].push(keyArr[j]);
      } else {
        while (keyArr.includes(String.fromCharCode(charCode)) || charCode === 74) {
          charCode++;
        }
        table[i].push(String.fromCharCode(charCode));
        charCode++;
      }
    }
  }

  return table;
}

function getBigramsFromString (str) {
  let cryptedStr = str.split(' ').join('').toUpperCase();
  const bigramsArr = [];

  for (let i = 0; i < cryptedStr.length + (cryptedStr.length % 2); i = i + 2) {
    if (i + 1 === cryptedStr.length + (cryptedStr.length % 2) - 1 && cryptedStr[i + 1] || cryptedStr[i] !== cryptedStr[i + 1] && cryptedStr[i + 1]) {
      bigramsArr.push(cryptedStr[i] + cryptedStr[i + 1]);
    } else if (i !== cryptedStr.length + (cryptedStr.length % 2)) {
      bigramsArr.push(cryptedStr[i] + 'X');
      if (cryptedStr[i + 1]) {
        i--;
      }
    }
  }

  return bigramsArr;
}

function cryptWithPlayfairCipher (str, key) {
  const table = createTableForPlayfairCipher(key);
  const bigramsArr = getBigramsFromString(str);

  let result = '';

  console.log('Table: ', table);
  console.log('Bigrams from input string: ', bigramsArr);

  bigramsArr.forEach((bigram) => {
    let i = 0;
    let a, b;
    while (i < 5) {
      if (table[i].includes(bigram[0])) {
        a = i;
        b = table[i].findIndex((el) => el === bigram[0]);
        i = 5;
      }
      i++;
    }

    let j = 0;
    let c, d;
    while (j < 5) {
      if (table[j].includes(bigram[1])) {
        c = j;
        d = table[j].findIndex((el) => el === bigram[1]);
        j = 5;
      }
      j++;
    }

    if (a === c) {
      if (b < TABLE_WIDTH - 1) {
        b = b + 1;
      } else {
        b = 0
      }

      if (d < TABLE_WIDTH - 1) {
        d = d + 1;
      } else {
        d = 0;
      }

      result += table[a][b] + table[c][d];
    } else if (b === d) {
      if (a < table.length - 1) {
        a = a + 1;
      } else {
        a = 0;
      }

      if (c < table.length - 1) {
        c = c + 1;
      } else {
        c = 0;
      }

      result += table[a][b] + table[c][d];
    } else {
      result += table[a][d] + table[c][b];
    }

  });

  return result;
}

function encryptPlayfairCipher (str, key) {
  const table = createTableForPlayfairCipher(key);
  const bigramsArr = getBigramsFromString(str);

  let result = '';

  console.log('Table: ', table);
  console.log('Bigrams from crypted string: ', bigramsArr);

  bigramsArr.forEach((bigram) => {
    let i = 0;
    let a, b;
    while (i < 5) {
      if (table[i].includes(bigram[0])) {
        a = i;
        b = table[i].findIndex((el) => el === bigram[0]);
        i = 5;
      }
      i++;
    }

    let j = 0;
    let c, d;
    while (j < 5) {
      if (table[j].includes(bigram[1])) {
        c = j;
        d = table[j].findIndex((el) => el === bigram[1]);
        j = 5;
      }
      j++;
    }

    if (a === c) {
      if (b !== 0) {
        b = b - 1;
      } else {
        b = TABLE_WIDTH - 1;
      }

      if (d !== 0) {
        d = d - 1;
      } else {
        d = TABLE_WIDTH - 1;
      }

      result += table[a][b] + table[c][d];
    } else if (b === d) {
      if (a !== 0) {
        a = a - 1;
      } else {
        a = table.length - 1;
      }

      if (c !== 0) {
        c = c - 1;
      } else {
        c = table.length - 1;
      }

      result += table[a][b] + table[c][d];
    } else {
      result += table[a][d] + table[c][b];
    }

  });

  return result;

}

console.log('ROUTE PERMUTATION CIPHER');
console.log(`Crypted string: ${encryptWithRoutePermutationCipher(NAME_STRING, TABLE_WIDTH)}\n\n`);

console.log('CRYPT WITH PLAYFAIR CIPHER');
const CRYPTED_WITH_PLAYFAIR_CIPHER_STRING = cryptWithPlayfairCipher(NAME_STRING, PLAYFAIR_CIPHER_KEY);
console.log(`Crypted string: ${CRYPTED_WITH_PLAYFAIR_CIPHER_STRING}\n\n`);

console.log('ENCRYPT PLAYFAIR CIPHER');
console.log(`Encrypted string: ${encryptPlayfairCipher(CRYPTED_WITH_PLAYFAIR_CIPHER_STRING, PLAYFAIR_CIPHER_KEY)}`);
