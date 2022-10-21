const CEASAR_CIPHER_KEY = 23;
const CEASAR_CIPHER_STRING = 'Srobdoskdehwlf vxevwlwxwlrq flskhuv';
const SIMPLE_REPLACEMENT_CIPHRE_STRING = 'KjgyVgkcVWZqdX nsWnqdqsqdji XdkcZmn';
const NAME_STRING = 'Nekhaychik Irina Igorevna';
  
function shiftLetters(str, key) {
  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
      newStr += String.fromCharCode((str.charCodeAt(i) + key - 65) % 26 + 65);
    } else if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) {
      newStr += String.fromCharCode((str.charCodeAt(i) + key - 97) % 26 + 97);
    } else {
      newStr += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return newStr;
}

function CeasarCipherDecryption(str, key) {
  if (key) {
    return shiftLetters(str, key);
  }

  const arrOfStr = [];

  for (let key = 1; key <= 25; key++) {
    const newStr = shiftLetters(str, key);
    arrOfStr.push(`key: ${key}; string: ${newStr}`);
  }

  return arrOfStr;
}

function getKeyOfSimpleReplacementCipher(str) {
  let decryptedPhrase = CeasarCipherDecryption(CEASAR_CIPHER_STRING, CEASAR_CIPHER_KEY);

  let key = '';

  for (let i = 65; i <= 90; i++) {
    let decryptedArr = decryptedPhrase.toUpperCase().split('');
    let strArr = str.toUpperCase().split('');

    let index = decryptedArr.findIndex(el => el.charCodeAt() === i);

    if (index !== -1) {
      key += strArr[index];
    } else {
      key += '*';
    }
  }

  return key;
}

console.log('Finding key of Ceasar cipher: ')
console.log(CeasarCipherDecryption(CEASAR_CIPHER_STRING));

console.log(`\nDecrypted phrase od Ceasar cipher: ${CeasarCipherDecryption(CEASAR_CIPHER_STRING, CEASAR_CIPHER_KEY)}`);

console.log(`\nKey of simple replacement cipher: ${getKeyOfSimpleReplacementCipher(SIMPLE_REPLACEMENT_CIPHRE_STRING)}`);

console.log(`\nCrypted name: ${shiftLetters(NAME_STRING, 5)}`);

console.log(CeasarCipherDecryption(shiftLetters(NAME_STRING, 5), 26-5));
