import * as request from 'supertest';
import * as casual from 'casual';

describe('Users Tests', () => {
    let server: request.SuperTest<request.Test>
    let token: string;
    let test_user: Object;

    beforeAll(async () => {
        server = request("http://localhost:9876");
        casual.define('user', function () {
            return {
                name: casual.full_name,
                email: casual.email,
                password: casual.password,
                creditcard: casual.card_number(),
                phone: casual.phone
            };
        });
    });

    it('API welcome', async () => {
        const res = await server.get('/');
        expect(res.body.message).toBe('Welcome to Finance API');
        expect(res.status).toBe(200);
    });

});
