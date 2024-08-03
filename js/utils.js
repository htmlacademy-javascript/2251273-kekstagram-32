function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function corectValue (value) {
  if (Number.isInteger(value)) {
    return value.toFixed(0);
  }
  return value.toFixed(1);
}

export { debounce, corectValue };

