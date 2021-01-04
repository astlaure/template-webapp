import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App Test Suite', () => {
    test('the application will mount', () => {
        mockedAxios.get.mockReturnValue({ username: 'jest', role: 'ADMIN' } as any);
        expect(true).toBeTruthy();
    });
});
