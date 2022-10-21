const OPEN_TEXT = 'Nekhaychik Irina Igorevna';

const ALPHABETH_SIZE = 26;
const A = 3.13; // A и ALPHABET_SIZE не должны иметь общих делителей
const S = 7;

const START_ASCII_CODE = 65;
const END_ASCII_CODE = 90;
const SPACE_ASCII_CODE = 32;

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
}

function createCipherAlphabet() {
  const cipherAlphabet = new Map();

  for (let P = START_ASCII_CODE; P <= END_ASCII_CODE; P++) {
    let value =
      Math.round((A * P + S) % ALPHABETH_SIZE) + (START_ASCII_CODE - 1);
    cipherAlphabet.set(P, value);
  }

  return cipherAlphabet;
}

// ASCII - 65-90, SPACE-->32
function cryptWithXORCipher(str) {
  const openText = str.toUpperCase();

  const cipherAlphabet = createCipherAlphabet();

  let cipherText = '';
  for (let i = 0; i < openText.length; i++) {
    const openCharCode = openText.charCodeAt(i);
    let cipherCharCode = openCharCode;
    if (openCharCode !== SPACE_ASCII_CODE) {
      cipherCharCode = cipherAlphabet.get(openCharCode);
    }
    cipherText += String.fromCharCode(cipherCharCode);
  }

  return cipherText;
}

function encryptXORCipher(str) {
  const cipherAlphabet = createCipherAlphabet();

  let encryptedText = '';
  for (let i = 0; i < str.length; i++) {
    const cipherCharCode = str.charCodeAt(i);
    let encryptedCharCode = cipherCharCode;
    if (cipherCharCode !== SPACE_ASCII_CODE) {
      encryptedCharCode = getByValue(cipherAlphabet, cipherCharCode);
    }
    encryptedText += String.fromCharCode(encryptedCharCode);
  }

  return encryptedText;
}

console.log('Cipher alphabet through char code: ');
console.log(createCipherAlphabet());

console.log('\n\n--- CRYPT ---\n');
console.log(`Open text: ${OPEN_TEXT}`);
console.log(`Crypted text: ${cryptWithXORCipher(OPEN_TEXT)}`);

console.log('\n\n--- ENCRYPT ---\n');
console.log(`Crypted text: ${cryptWithXORCipher(OPEN_TEXT)}`);
console.log(
  `Encrypted text: ${encryptXORCipher(cryptWithXORCipher(OPEN_TEXT))}`,
);
