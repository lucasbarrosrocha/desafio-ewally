const request = require('supertest')
const app = require('../src/app');

describe('Testes para a rota que extrai os dados de um código de barra', () => {

    it('teste para retornar 200 (com código de barras correto)', async () => {
        const response = await request(app).get('/boleto/21290001192110001210904475617405975870000002000')
        expect(response.status).toBe(200);
    });
    
    it('teste para retornar 400 (com código de barras incorreto)', async () => {
        const response = await request(app).get('/boleto/2129000119211000121090447561740597587000000')
        expect(response.status).toBe(400);
    });

    it('teste para amount, com o código: 21290001192110001210904475617405975870000002000', async () => {
        const response = await request(app).get('/boleto/21290001192110001210904475617405975870000002000')
        const { amount } = response._body
        expect(amount).toBe('20.00');
    });

    it('teste para expirationDate, com o código: 21290001192110001210904475617405975870000002000', async () => {
        const response = await request(app).get('/boleto/21290001192110001210904475617405975870000002000')
        const { expirationDate } = response._body
        expect(expirationDate).toBe('2018-07-16T00:00:00.000Z');
    });

    it('teste para barCode, com o código: 21290001192110001210904475617405975870000002000', async () => {
        const response = await request(app).get('/boleto/21290001192110001210904475617405975870000002000')
        const { barCode } = response._body
        expect(barCode).toBe('21299758700000020000001121100012100447561740');
    });

    it('teste para amount, com o código: 34191578100001153001091000000135555112220000', async () => {
        const response = await request(app).get('/boleto/34191578100001153001091000000135555112220000')
        const { amount } = response._body
        expect(amount).toBe('1153.00');
    });

    it('teste para expirationDate, com o código: 34191578100001153001091000000135555112220000', async () => {
        const response = await request(app).get('/boleto/34191578100001153001091000000135555112220000')
        const { expirationDate } = response._body
        expect(expirationDate).toBe('2013-08-05T00:00:00.000Z');
    });

    it('teste para barCode, com o código: 34191578100001153001091000000135555112220000', async () => {
        const response = await request(app).get('/boleto/34191578100001153001091000000135555112220000')
        const { barCode } = response._body
        expect(barCode).toBe('34191578100001153001091000000135555112220000');
    });

});
