import { ObjectId } from 'mongodb';
import clientPromise, { databaseName } from '../../../utils/mongodb';
import { middleware } from '../middleware';


export async function GET(request) {
  const authCheck = await middleware(request);
  if (authCheck) return authCheck; 

    try {
      const client = await clientPromise;
      const db = client.db(databaseName); // Replace with your database name
      const usersCollection = db.collection('users');
  
      // Access query parameters from nextUrl.searchParams
      const userId = request.nextUrl.searchParams.get('userId');
    //   console.log("userId====", userId);
  
      // If a userId is provided, fetch a single user
      if (userId) {
        if (!ObjectId.isValid(userId)) {
          return new Response(JSON.stringify({ status: 'error', message: 'Invalid userId format' }), { status: 400 });
        }
  
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
  
        if (!user) {
          return new Response(JSON.stringify({ status: 'error', message: 'User not found' }), { status: 404 });
        }
  
        return new Response(JSON.stringify({ status: 'success', user }), { status: 200 });
      } else {
        // Otherwise, fetch all users
        const users = await usersCollection.find({}).toArray();
        return new Response(JSON.stringify({ status: 'success', users }), { status: 200 });
      }
    } catch (error) {
      return new Response(JSON.stringify({ status: 'error', message: error.message }), { status: 500 });
    }
  }