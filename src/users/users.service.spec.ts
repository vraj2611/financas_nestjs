import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {describe, it, expect} from '@jest/globals';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();
    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create user', async () => {
    expect( await service.getLoggingUser("vraj2611@gmail.com", "123")).toBe('user')
  });
  
  it('should be list users', async () => {
    expect( await service.listUsers()).toBeTruthy()
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
