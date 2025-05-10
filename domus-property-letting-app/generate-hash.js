// generate-hash.js
import bcrypt from 'bcryptjs';

const password = 'admin123';

async function generate() {
  const hash = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hash);
}

generate();
