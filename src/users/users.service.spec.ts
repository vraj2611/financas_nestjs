import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { describe, it, expect, test, afterAll } from '@jest/globals';
import { doesNotMatch } from 'assert';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [UsersService],
        }).compile();
        service = moduleRef.get<UsersService>(UsersService);
    });

    test('be defined', () => {
        expect(service).toBeDefined();
    });

    // test('create user', async () => {
    //     expect(await service.addUser("vraj2611@gmail.com", "123", "Vilmar")).toBe("Vilmar")
    // });

    test('get user', async () => {
        expect((await service.getUser("vraj2611@gmail.com")).email).toBe("vraj2611@gmail.com")
    });

    test('get user nao existe', async () => {
        expect(await service.getUser("vraj2611@gmail.co")).toBeFalsy()
    });

    test('log user ok', async () => {
        expect((await service.logUser("vraj2611@gmail.com", "123")).email).toBe("vraj2611@gmail.com")
    });

    test('log user password incorreto', async () => {
        expect( await service.logUser("vraj2611@gmail.com", "_zz")).toBeFalsy()
    });

    //   it.each`
    //     name      | returnVal
    //     ${'john'} | ${{ userId: 1, username: 'john', password: 'changeme' }}
    //   `(
    //     'should call findOne for $name and return $returnVal',
    //     async ({ name, returnVal }: { name: string; returnVal: IUser }) => {
    //       expect(await service.findOne(name)).toEqual(returnVal);
    //     },
    //   );

});
