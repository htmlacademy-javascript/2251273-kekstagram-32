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

// функция генерации случайного числа
const getRandomInt = (min = 0, max = 100) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

// Функция перевода времени в минуты
const getMinutes = function (timeDay) {
  const [hours, minutes] = timeDay.split(':').map((item) => Number(item));
  return hours * 60 + minutes;
};

// Функция проверки рабочих часов
const isWorkingHours = (beginningWork, endWork, beginningMeeting, durationMeeting) => getMinutes(beginningWork) <= getMinutes(beginningMeeting) && getMinutes(beginningMeeting) + durationMeeting <= getMinutes(endWork);


export { lengthString, isPalindrome, isPalindrome2, filterNumber, filterNumber2, getRandomInt, isWorkingHours };
