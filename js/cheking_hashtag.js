const HashtagLength = {
  MIN: 2,
  MAX: 20
};

const HashtagCount = {
  MAX: 5
};

// функция проверки строки хэштега
const checkingHashtag = new function () {
  this.textError = '';
  this.error = () => this.textError;
  this.checkHashtag = (hashtag) => {
    const mask = /^#[a-z\u0430-\u044F\u04510-9]{1,19}$/i;
    if (!hashtag.startsWith('#')) {
      this.textError = `"${hashtag}" — Хэштег должен начинаться c символа "#"!`;
      return false;
    } else if (hashtag.lastIndexOf('#') !== 0) {
      this.textError = `"${hashtag}" — Хэштег должен содержать только один символ "#"!`;
      return false;
    } else if (hashtag.length === HashtagLength.MIN - 1) {
      this.textError = `"${hashtag}" — Хэштег должен содержать "#" и 1 символ!`;
      return false;
    } else if (hashtag.length > HashtagLength.MAX) {
      this.textError = `"${hashtag}" — Хэштег должен содержать не более 20 символов!`;
      return false;
    } else if (!mask.test(hashtag)) {
      this.textError = `"${hashtag}" — Хэштег может содержать только буквы и цифры!`;
      return false;
    }
    this.textError = '';
    return true;
  };
  this.checkDublicates = (arrayHashtags) => {
    const arrayHashtagsLower = arrayHashtags.map((item) => item.toLowerCase());
    const setHashtagsLower = new Set(arrayHashtagsLower);
    let answer = [];
    if (arrayHashtagsLower.length === setHashtagsLower.size) {
      return true;
    } else {
      for (const item of arrayHashtagsLower) {
        if (arrayHashtagsLower.indexOf(item) !== arrayHashtagsLower.lastIndexOf(item)) {
          answer.push(item);
        }
      }
      answer = [...new Set(answer)];
      this.textError = `Хэштег${answer.length > 1 ? 'и' : ''}" ${answer.join(', ')} " повторя${answer.length === 1 ? 'е' : 'ю'}тся! Хэштеги не должны повторяться!(регистр не имеет значения!)`;
      return false;
    }
  };
  this.checkTextHashtag = (textHashtag) => {
    if (!textHashtag.trim()) {
      this.textError = '';
      return true;
    } else {
      const arrayHashtags = textHashtag.trim().split(/\s+/);
      if (arrayHashtags.length > HashtagCount.MAX) {
        this.textError = `Максимальное количество хэштегов - ${HashtagCount.MAX}!`;
        return false;
      } else if (!this.checkDublicates(arrayHashtags)) {
        return false;
      } else {
        return arrayHashtags.every(this.checkHashtag);
      }
    }
  };
};

export { checkingHashtag };
