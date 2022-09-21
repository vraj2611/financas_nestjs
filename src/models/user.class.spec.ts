import { describe, expect, test, afterAll } from '@jest/globals';
import { IUser, User } from './user.class';

describe('Model User', () => {
    beforeAll(async () => {
        
    })

    beforeEach(async () => {
    
    });

    test('constructor', () => {
        const info :IUser = {
            name: "Vilmar",
            email: "vilmar@gmail.com",
            password: "123",
            id: 123
        }
        const user:User = new User(info);

        expect(user.email).toBe(info.email);
    });
});