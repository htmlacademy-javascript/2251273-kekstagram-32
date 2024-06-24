const testString = '  Лёша на полке клопа нашёл ';


// функция проверки длины строки
function lengthString(string, length) {
  return string.length <= length;
}


// функция проверки палиндрома
function isPalindrome(string) {
  return string.replaceAll(' ', '').toLowerCase() === string.split('').reverse().join('').replaceAll(' ', '').toLowerCase();
}


// функция проверки палиндрома 2
function isPalindrome2(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length / 2; i++) {
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }
  }
  return true;
}


// функция фильтрации числа
function filterNumber(string) {
  string = String(string).replaceAll(' ', '');
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string[i])) {
      result += string[i];
    }
  }
  return result ? Number(result) : NaN;
}


// функция фильтрации числа 2
function filterNumber2(string) {
  return Number(String(string).replaceAll(' ', '').split('').filter((i) => !isNaN(i)).join('')) || NaN;
}


// test
lengthString(testString, 27);
isPalindrome(testString);
isPalindrome2(testString);
filterNumber(testString);
filterNumber2('агент');
