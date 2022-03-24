const { getValue } = require('../utils/getValue');
const { getBarcodeConcessionaria, getBarcodeBank } = require('../utils/getBarcode');

function getCodeType(code) {
  if (code.length === 44) return 'CODIGO DE BARRAS';
  else if (code.length >= 46 && code.length <= 48) return 'CODIGO DIGITAVEL';
  return 'INVALIDO';
}

function getTypeOfCode(code) {
  const type = code.substr(0, 2);
  if (Number(type[0]) === 8) return 'CONCESSIONARIA'
  return 'BANCO'
}

function extractAmount(code) {
  const type = getTypeOfCode(code);
  const typeCode = getCodeType(code);
  return getValue(code, type, typeCode);
}

function extractExpirationDate(code) {
  const febrabanDate = new Date('1997-10-07');
  const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

  const typeCode = getCodeType(code);
  const type = getTypeOfCode(code);

  const days = typeCode === 'CODIGO DIGITAVEL' ? Number(code.substr(33, 4)) : Number(code.substr(5, 4));
  const milliseconsOfDays = type === 'BANCO' ? days * DAY_IN_MILLISECONDS : 0;

  return milliseconsOfDays || milliseconsOfDays === 0 ? new Date(febrabanDate.getTime() + milliseconsOfDays) : febrabanDate;
}

function extractBarcode(code) {
  const codeType = getCodeType(code);
  const type = getTypeOfCode(code);

  let barcode = '';
  if (type === 'BANCO') barcode = codeType === 'CODIGO DIGITAVEL' ? getBarcodeBank(code) : code;
  if (type === 'CONCESSIONARIA') barcode = codeType === 'CODIGO DIGITAVEL' ? getBarcodeConcessionaria(code) : code;
  return barcode;
}

function getDetails(req, res, next) {
  const code = req.params.barcode;

  if (getCodeType(code) === 'INVALIDO') return res.status(400).json(`Código de barras inválido`);

  const amount = extractAmount(code);
  const expirationDate = extractExpirationDate(code);
  const barCode = extractBarcode(code);

  res.json({
    amount,
    expirationDate,
    barCode
  });
}

module.exports = {
  getDetails,
};
