function getBarcodeBank(code) {
  return `${code.substring(0, 4)}${code.substring(32, 47)}${code.substring(4, 9)}${code.substring(10, 20)}${code.substring(21, 31)}`;
};

function getBarcodeConcessionaria(code) {
  let barcode = '';

  for (let index = 0; index < 4; index += 1) {
    const start = (11 * (index)) + index;
    const end = (11 * (index + 1)) + index;

    barcode += code.substring(start, end);
  }
  return barcode;
};


module.exports = {
  getBarcodeBank,
  getBarcodeConcessionaria
};

