import axios from 'axios';
import { User } from '~/types/interfaces';

const apiUrl = "http://localhost:8083";

// Fetch all users
export async function getAllUsers(authToken: string): Promise<User[]> {
  try {
    const response = await axios.get(`${apiUrl}/api/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    const users = response.data.users;

    if (!Array.isArray(response.data.users)) {
      console.error("Users data is not an array:", response.data);
      throw new Error("Users data is not an array");
    }

    return users as User[];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching users:', error.message);
      throw new Error('Error fetching users');
    } else {
      throw error;
    }
  }
}

// Fetch a user by their ID
export async function getUserById(userId: number, authToken: string): Promise<User | null> {
  try {
    const response = await axios.get(`${apiUrl}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    const user = response.data.user;

    return user as User;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching user:', error.message);
      throw new Error('Error fetching user');
    } else {
      throw error;
    }
  }
}

// Add a new user
export async function addUser(newUser: Partial<User>, authToken: string): Promise<User> {
  try {
    const response = await axios.post(`${apiUrl}/api/users`, newUser, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    return response.data as User;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error adding user:', error.message);
      throw new Error('Error adding user');
    } else {
      throw error;
    }
  }
}

// Update a user
export async function updateUser(userId: number, updatedUser: Partial<User>, authToken: string): Promise<User> {
  try {
    const response = await axios.put(`${apiUrl}/api/users/${userId}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    return response.data as User;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error updating user:', error.message);
      throw new Error('Error updating user');
    } else {
      throw error;
    }
  }
}

// Delete a user
export async function deleteUser(userId: number, authToken: string): Promise<void> {
  try {
    await axios.delete(`${apiUrl}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting user:', error.message);
      throw new Error('Error deleting user');
    } else {
      throw error;
    }
  }
}
