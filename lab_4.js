const DECIMAL_NUMBER = 3n ** 43n;
const OPEN_TEXT = 'bad eagle feel mama fill cake pink milk';
const REGISTR_NUMBER = 179117333n;
const SHIFT_LEFT = 5;

function convertDecimalBigIntToBinary(number) {
  if (number > 0) {
    return convertDecimalBigIntToBinary(number / 2n) + (number % 2n);
  }

  return '';
}

function convertDecimalToBinary(number) {
  if (number > 0) {
    return convertDecimalToBinary(parseInt(number / 2)) + (number % 2);
  }

  return '';
}

function convertBinaryToDecimalBigInt(number) {
  result = 0n;
  for (let i = 0; i < number.length; i++) {
    result += BigInt(number[i]) * 2n ** BigInt(number.length - 1 - i);
  }

  return result;
}

function task2(openText) {
  const map = new Map();
  let startCodeChar = 65;
  const endCodeChar = 80;
  let count = 0;

  for (let i = startCodeChar; i <= endCodeChar; i++) {
    let binary = convertDecimalToBinary(count);
    count++;
    if (binary.length < 4) {
      while (binary.length !== 4) {
        binary = 0 + binary;
      }
    }
    map.set(i, binary);
  }

  console.log(map, '\n');
  console.log(openText + '\n');

  let str = openText.toUpperCase().split(' ').join('');
  let binaryStr = '';
  for (let i = 0; i < str.length; i++) {
    binaryStr += map.get(str.charCodeAt(i));
  }

  let binaryResult = '';
  for (let i = 0; i < parseInt(binaryStr.length / 64); i++) {
    binaryResult +=
      binaryStr
        .split('')
        .slice(i * 64, i * 64 + 64)
        .join('') + ' ';
  }

  binaryResult = binaryResult.trim().split(' ');
  console.log(binaryResult, '\n');

  let result = '';
  for (let i = 0; i < binaryResult.length; i++) {
    result += convertBinaryToDecimalBigInt(binaryResult[i]) + ' ';
  }

  return result.trim();
}

function task3(number, shiftLeft) {
  const binaryNumber = convertDecimalBigIntToBinary(number).split('');

  for (let i = 0; i < shiftLeft; i++) {
    const popBit = binaryNumber.pop();
    binaryNumber.unshift(popBit);
  }

  console.log(`Input decimal number: ${number}`);
  console.log(
    `Converting input number to binary: ${convertDecimalBigIntToBinary(
      number,
    )}`,
  );

  return binaryNumber.join('');
}

function task4(number) {
  const number1 = 2244899301n;
  let binaryNumber1 = convertDecimalBigIntToBinary(number1);
  let binaryNumber = convertDecimalBigIntToBinary(number);

  let result = '';
  if (binaryNumber.length !== binaryNumber1.length) {
    if (binaryNumber.length > binaryNumber1.length) {
      const binaryNumber1Arr = binaryNumber1.split('');
      while (binaryNumber1Arr.length !== binaryNumber.length) {
        binaryNumber1Arr.unshift('0');
      }
      binaryNumber1 = binaryNumber1Arr.join('');
    } else {
      const binaryNumberArr = binaryNumber.split('');
      while (binaryNumberArr.length !== binaryNumber1.length) {
        binaryNumberArr.unshift('0');
      }
      binaryNumber = binaryNumberArr.join('');
    }
  }

  for (let i = 0; i < binaryNumber.length; i++) {
    if (binaryNumber[i] === binaryNumber1[i]) {
      result += '0';
    } else {
      result += '1';
    }
  }

  console.log(`Number 1: ${binaryNumber}`);
  console.log(`Number 2: ${binaryNumber1}`);

  return result;
}

console.log('--- DECIMAL TO BINARY ---\n');
console.log(`Decimal number (3^43): ${DECIMAL_NUMBER}`);
console.log(`Binary number: ${convertDecimalBigIntToBinary(DECIMAL_NUMBER)}`);

console.log('\n--- TASK 2 ---\n');
console.log(`Result decimal numbers: ${task2(OPEN_TEXT)}`);

console.log('\n--- TASK 3 (14) ---\n');
console.log(`Result: ${task3(REGISTR_NUMBER, SHIFT_LEFT)}`);

console.log('\n--- TASK 4 (14) ---\n');
console.log(`Result: ${task4(REGISTR_NUMBER)}`);
