// src/app/api/signup/route.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();

  // Dummy data for example (replace with database check)
  const user = {
    email: 'user@example.com',
    password: '$2a$10$QwQkFZG1EBhxR7eTggS5eeLhZa6rSdyk4JDi2lDJZg/BuHrtc9PQa', // Hashed password
  };

  if (email === user.email && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
    return new Response(JSON.stringify({ token }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }
}