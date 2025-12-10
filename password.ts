import * as bcrypt from 'bcryptjs';

async function run() {
  const password = await bcrypt.hash('password', 10);

  console.log('encrypted password:', btoa(`maxkindl@icloud.com:password`));
}

run();
