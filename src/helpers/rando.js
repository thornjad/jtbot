const rando = (arr) => {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

module.exports = rando;
