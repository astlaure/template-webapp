import bcryptUtil from '../../../../src/app/security/bcrypt/bcrypt.util';

describe('BCrypt Util', () => {
  test('When the password is not empty encode it', async () => {
    try {
      const hash = await bcryptUtil.encode('jest-password');
      expect(hash).toBeDefined();
    } catch (err) {
      fail(err);
    }
  });

  test('When the password is empty throw an error', async () => {
    try {
      await bcryptUtil.encode('');
      fail();
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  test('When the password and hash are not empty and match succeed', async () => {
    try {
      const hash = await bcryptUtil.encode('jest');
      const isMatching = await bcryptUtil.decode('jest', hash);
      expect(isMatching).toBeTruthy();
    } catch (err) {
      fail(err);
    }
  });

  test('When the password and hash are not empty and doesn\'t match fail', async () => {
    try {
      const hash = await bcryptUtil.encode('bad-password');
      const isMatching = await bcryptUtil.decode('jest', hash);
      expect(isMatching).toBeFalsy();
    } catch (err) {
      fail(err);
    }
  });

  test('When the password or hash is empty and doesn\'t match fail', async () => {
    try {
      const isMatching = await bcryptUtil.decode('', '');
      expect(isMatching).toBeFalsy();
    } catch (err) {
      fail(err);
    }
  });
});
