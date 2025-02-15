import bcrypt from 'bcryptjs';
import clientPromise, { databaseName } from '../../../utils/mongodb';

const SALT_ROUNDS = 10;

async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function POST(req) {
  try {
    let {fullname, email, password } = await req.json();

    if (!email || !password) {
      return jsonResponse(400, { status: 'error', message: 'Email and password are required' });
    }

    const client = await clientPromise;
    const db = client.db(databaseName);
    const usersCollection = db.collection('users');

    if (await usersCollection.findOne({ email })) {
      return jsonResponse(409, { status: 'error', message: 'User already exists' });
    }

    password = await hashPassword(password);
    const { insertedId } = await usersCollection.insertOne({fullname, email, password });

    return jsonResponse(201, { status: 'success', message: 'User created successfully', userId: insertedId });
  } catch (error) {
    console.error('Signup Error:', error);
    return jsonResponse(500, { status: 'error', message: 'Internal Server Error' });
  }
}

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
