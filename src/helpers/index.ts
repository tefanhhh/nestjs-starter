import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

export async function hash(password): Promise<string> {
  return await bcrypt.hash(password, saltOrRounds);
}

export async function isMatch(password, _hash) {
  const val = await bcrypt.compare(password, _hash);
  return val;
}
