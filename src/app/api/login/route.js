import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise, { databaseName } from '../../../utils/mongodb';

export async function POST(req) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db(databaseName);
  const usersCollection = db.collection('users');

  // Fetch the user from the database
  const user = await usersCollection.findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ status: 'error', message: 'User does not exist' }), { status: 409 });
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign({ name:user?.fullname, email: user.email, _id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    return new Response(JSON.stringify({ token }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }
}
