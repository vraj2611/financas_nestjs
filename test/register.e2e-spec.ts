import * as request from 'supertest';

describe('Initial Register', () => {
    let server: request.SuperTest<request.Test>
    let token: string;

    beforeAll(async () => {
        server = request("http://localhost:9876");
    });

    it('API welcome', async () => {
        const res = await server.get('/');
        expect(res.body.message).toBe('Welcome to Finance API');
        expect(res.status).toBe(200);
    });

    it('create User', async () => {
        const res = await server.post('/users')
        .send({name: 'john', email: 'eert@gmail.com', password: '12345'})
        .set('Accept', 'application/json')
        expect(res.status).toBe(201);
    });

    it('Login User', async () => {
        const res = await server.post('/login')
        .send({email: 'eert@gmail.com', password: '12345'})
        .set('Accept', 'application/json')
        expect(res.status).toBe(21);
    });

    afterAll(async () => {
        console.log("fim")
    });
});
