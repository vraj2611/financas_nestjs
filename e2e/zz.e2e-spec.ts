import * as request from 'supertest';

describe('E2E JWT Sample', () => {
    let server: request.SuperTest<request.Test>

    beforeAll(async () => {
        server = request("http://localhost:8976");
    });

    it('should be OK', async () => {
        const loginReq = await server.get('/')
            .expect(200)
    });


    afterAll(async () => {
        console.log("fim")
    });
});
