import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  rawPassword: string,
  encryptedPassword: string
) => bcrypt.compare(rawPassword, encryptedPassword);
