import { ObjectId } from 'mongodb';
import clientPromise, { databaseName } from '../../../../utils/mongodb';
import { middleware } from '../../middleware';


export async function POST(request) {
    const authCheck = await middleware(request);
    if (authCheck) return authCheck;
    const { userId, fullname, email, newPassword, oldPassword, phone, profilePicture } = await request.json();
    // console.log("request", userId, fullname, email, newPassword, oldPassword, phone, profilePicture)


    try {
        const client = await clientPromise;
        const db = client.db(databaseName); // Replace with your database name
        const usersCollection = db.collection('users');

        if (userId) {
            if (!ObjectId.isValid(userId)) {
                return new Response(JSON.stringify({ status: 'error', message: 'Invalid userId format' }), { status: 400 });
            }

            const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

            if (!user) {
                return new Response(JSON.stringify({ status: 'error', message: 'User not found' }), { status: 404 });
            }

            const updatedUser = await usersCollection.findOneAndUpdate(
                { _id: new ObjectId(user._id) }, // Filter
                { $set: { fullname: fullname, phone: phone } }, // Update
                { returnDocument: 'after' } // Options
            );

            return new Response(JSON.stringify({ status: 'success', updatedUser }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ status: 'error', message: 'User not found' }), { status: 404 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ status: 'error', message: error.message }), { status: 500 });
    }
}