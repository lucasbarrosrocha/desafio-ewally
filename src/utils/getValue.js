function getValueForBank(code, codeType) {
  let value = '0';

  if (codeType === 'CODIGO DE BARRAS') {
    value = code.substr(9, 10);
  }
  if (codeType === 'CODIGO DIGITAVEL') {
    value = code.substr(-8, 8);
  }

  return String((parseInt(value, 10) / 100.0).toFixed(2));
};

function getValueForConcessionaria(code, codeType) {
  let value = '0';

  if (codeType === 'CODIGO DE BARRAS') {
    value = code.substr(4, 11);
  }
  if (codeType === 'CODIGO DIGITAVEL') {
    value = `${code.substr(0, 11)}${code.substring(12)}`.substr(4, 11);
  }

  return String((parseInt(value, 10) / 100.0).toFixed(2));
};

function getValue(code, type, codeType) {
  if (type === 'BANCO') return getValueForBank(code, codeType);
  if (type === 'CONCESSIONARIA') return getValueForConcessionaria(code, codeType);
  return 0;
};

module.exports = {
  getValue,
};

