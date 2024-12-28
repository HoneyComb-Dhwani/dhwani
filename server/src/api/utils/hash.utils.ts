import * as bcrypt from 'bcrypt';

const generateSalt = async (): Promise<string> => {
  return await bcrypt.genSalt(10);
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await generateSalt();
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};
