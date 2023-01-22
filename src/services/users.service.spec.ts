import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { describe, expect, test, afterAll } from '@jest/globals';

async function getUserService():Promise<UsersService>{
    const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [UsersService],
    }).compile();
    return moduleRef.get<UsersService>(UsersService);
}


describe('UsersService', () => {
    let service: UsersService;
    let emailtest: string;

    
    beforeAll(async () => {
        const serv = await getUserService();
        const users = await serv.listUsers();
        console.log({users});
        emailtest = "test_" + Date.now() + "@test.com"
    })

    beforeEach(async () => {
        service = await getUserService()
    });

    test('be defined', () => {
        expect(service).toBeDefined();
    });

    test('create user', async () => {
        const user = await service.addUser(emailtest, "123", "Email para teste");
        expect(user.email).toBe(emailtest)
    });

    test('get user', async () => {
        const user = await service.getUser(emailtest); 
        expect(user.email).toBe(emailtest)
    });

    test('get user nao existe', async () => {
        const user = await service.getUser("_zz" + emailtest);
        expect(user).toBeFalsy()
    });

    test('log user ok', async () => {
        const user = await service.loginUser(emailtest, "123") 
        expect(user.email).toBe(emailtest)
    });

    test('log user password incorreto', async () => {
        const user = await service.loginUser(emailtest, "zzz") 
        expect(user).toBeFalsy()
    });

    test('list users', async () => {
        const users = await service.listUsers();
        expect(users.length).toBeGreaterThan(0)
    });

    test('delete user', async () => {
        await service.deleteUser(emailtest); 
        const userpos = await service.getUser(emailtest); 
        expect(userpos).toBeFalsy();
    });

});
