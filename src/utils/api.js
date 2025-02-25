export async function getAllUsersProfiles() {
    try {
        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you need to send the token for authentication
            },
        });

        const data = await response.json();

        if (response.ok) {
            return data; // Return the list of user profiles
        } else {
            throw new Error(data.message || 'Failed to fetch user profiles');
        }
    } catch (error) {
        console.error('Error fetching user profiles:', error);
        throw error; // Re-throw the error so it can be handled by the calling function
    }
};
export async function getUserById(userId) {
    try {
        // Check if token exists before proceeding
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found.');
        }

        const response = await fetch(`/api/users?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Send token for authentication
            },
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to fetch user profile');
        }

        // Parse the response body if successful
        const data = await response.json();
        return data; // Return the user profile
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error; // Re-throw the error so it can be handled by the calling function
    }
}

export async function updateProfile(data) {
    try {
        // Check if token exists before proceeding
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found.');
        }

        // Extract userId from the data object
        const { userId, fullname, email, phone, profilePicture, oldPassword, newPassword } = data;

        // Make a POST request to update the profile
        const response = await fetch('/api/users/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Send token for authentication
            },
            body: JSON.stringify({
                userId,
                fullname,
                email,
                phone,
                profilePicture,
                oldPassword,
                newPassword,
            }),
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile');
        }

        // Parse the response body if successful
        const responseData = await response.json();
        return responseData; // Return the updated profile data
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error; // Re-throw the error so it can be handled by the calling function
    }
}

//   export default getAllUsersProfiles;