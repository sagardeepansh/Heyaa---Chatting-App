import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import clientPromise, { databaseName } from '../../utils/mongodb';

const SECRET_KEY = process.env.JWT_SECRET; // Ensure this is set in .env

export async function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ status: 'error', message: 'Unauthorized: No token provided' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {

    const client = await clientPromise;
      const db = client.db(databaseName); // Replace with your database name
      const usersCollection = db.collection('users');
      

    // Verify JWT
    const decoded = jwt.verify(token, SECRET_KEY);
    // console.log("decoded",request.user)
    // request.userId = decoded._id; // Attach user info to request if needed

    if (!ObjectId.isValid(decoded._id)) {
        return new Response(JSON.stringify({ status: 'error', message: 'Invalid userId format' }), { status: 400 });
      }

      const user = await usersCollection.findOne({ _id: new ObjectId(decoded._id) });

      if (!user) {
        return new Response(JSON.stringify({ status: 'error', message: 'User not found' }), { status: 404 });
      }

  } catch (error) {
    return new Response(JSON.stringify({ status: 'error', message: 'Unauthorized', redirect: '/auth/login' }), { status: 403 });
  }

  return null; // Allow the request to proceed if verification is successful
}
