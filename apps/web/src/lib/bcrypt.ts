import * as bcrypt from 'bcrypt-ts';

export const hash = async (value: string): Promise<string> => {
  const SALT = await bcrypt.genSalt(10);
  return bcrypt.hash(value, SALT);
};

export const compare = ({
  value,
  hashedValue,
}: {
  value: string;
  hashedValue: string;
}): Promise<boolean> => {
  return bcrypt.compare(value, hashedValue);
};
