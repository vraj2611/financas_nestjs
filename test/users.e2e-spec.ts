import * as request from 'supertest';
import * as casual from 'casual';

function show(res){
    if (res.status >= 400) {
        console.log({ status: res.status, body: res.body })
    }
}

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

    it('error create User by weak password', async () => {
        test_user = casual['user'];
        const res = await server.post('/users')
            .send(test_user)
            .set('Accept', 'application/json')
        expect(res.status).toBe(400);
    });


    it('create User', async () => {
        test_user = casual['user'];
        test_user['password'] = 'Az1!@#' + test_user['password']
        console.log({test_user});
        const res = await server.post('/users')
            .send(test_user)
            .set('Accept', 'application/json')
        show(res)
        test_user['id'] = res.body.id;
        expect(res.status).toBe(201);
    });

    it('error create User by duplicate email', async () => {
        const res = await server.post('/users')
            .send(test_user)
            .set('Accept', 'application/json')

        expect(res.status).toBe(400);
    });

    it('error login User by wrong password', async () => {
        let res = await server.post('/login')
            .send({ email: test_user['email'], password: 'wrong_password' })
            .set('Accept', 'application/json')

        expect(res.status).toBe(401);
    });

    it('error login User by many requests', async () => {
        let res = await server.post('/login')
            .send({ email: test_user['email'], password: 'wrong_password' })
            .set('Accept', 'application/json')

        res = await server.post('/login')
            .send({ email: test_user['email'], password: 'wrong_password' })
            .set('Accept', 'application/json')

        expect(res.status).toBe(429);
    });

    it('Login User', async () => {
        await (new Promise((resolve) => setTimeout(resolve, 2000)));
        const res = await server.post('/login')
            .send({ email: test_user['email'], password: test_user['password'] })
            .set('Accept', 'application/json')

        token = res.body['authtoken'];
        expect(res.status).toBe(201);
    });

    it('error list user by missing token', async () => {
        const res = await server.get('/users')
            .set('Accept', 'application/json')

        expect(res.status).toBe(401);
    });

    it('list user', async () => {
        const res = await server.get('/users')
            .set('Accept', 'application/json')
            .set('Authtoken', token);

        show(res)
        expect(res.status).toBe(200);
    });

    it('error refresh token by missing token', async () => {
        const res = await server.get('/refresh_token')
            .set('Accept', 'application/json')

        expect(res.status).toBe(401);
    });

    it('error refresh token by many requests', async () => {
        const res = await server.get('/refresh_token')
            .set('Accept', 'application/json')
            .set('Authtoken', token);

        expect(res.status).toBe(429);
    });

    it('refresh token', async () => {
        await (new Promise((resolve) => setTimeout(resolve, 2100)));
        const res = await server.get('/refresh_token')
            .set('Accept', 'application/json')
            .set('Authtoken', token);

        token = res.body['authtoken'];
        expect(res.status).toBe(200);
    });

    it('list user with refreshed token', async () => {
        const res = await server.get('/users')
            .set('Accept', 'application/json')
            .set('Authtoken', token);

        expect(res.status).toBe(200);
    });

    it('get user own profile', async () => {
        const res = await server.get('/users/myprofile')
            .set('Accept', 'application/json')
            .set('Authtoken', token);

        console.log({ status: res.status, body: res.body });
        expect(res.status).toBe(200);
        expect(test_user['email']).toBe(res.body['email']);
    });

    // it('delete user', async () => {
    //     const res = await server.delete('/users/' + test_user['id'])
    //         .set('Accept', 'application/json')
    //         .set('Authtoken', token);

    //     expect(res.body['name']).toBe('deleted_' + test_user['id']);
    // });

    //console.log({ status: res.status, body: res.body });
    it('error list user by many requests', async () => {
        let res;
        for (let i = 1; i < 15; i++) {
            res = await server.get('/users')
                .set('Accept', 'application/json')
        }
        expect(res.status).toBe(429);
    });

});
