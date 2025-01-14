// src/app/api/login/route.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}


export async function POST(req) {
  const { email, password } = await req.json();
  const hashedPassword = await hashPassword(password);

  // Dummy data for example (replace with database check)
  const user = {
    email: 'admin@gmail.com',
    password: '$2a$10$WhuAbay63/bxC8yw4XbGjOvIb24g5CWGUJ0pCL22tw8rPNza9PWBK', // Hashed password
  };

  if (email === user.email && bcrypt.compare(hashedPassword, user.password)) {
    const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
    return new Response(JSON.stringify({ token }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }
}