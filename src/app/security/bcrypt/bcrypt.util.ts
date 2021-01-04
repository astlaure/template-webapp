import bcrypt from 'bcrypt';

const encode = (password: string): Promise<string> => {
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
