import bcrypt from 'bcrypt';

const encode = (password: string): Promise<string> => {
  if (!password) { throw Error('password is null|undefined|empty.'); }
  return bcrypt.hash(password, 10);
};

const decode = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

const bcryptUtil = {
  encode,
  decode,
};

export default bcryptUtil;
