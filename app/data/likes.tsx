import axios from 'axios';
import { Like } from '~/types/interfaces';

const apiUrl = "http://localhost:8083";

// Fetch all likes
export async function getAllLikes(authToken: string): Promise<Like[]> {
  try {
    const response = await axios.get(`${apiUrl}/api/likes`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    const likes = response.data.likes;

    if (!Array.isArray(likes)) {
      console.error("Likes data is not an array:", response.data);
      throw new Error("Likes data is not an array");
    }

    // Fetch user details for each like
    for (const like of likes) {
      const userResponse = await axios.get(`${apiUrl}/api/users/${like.user_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      like.user = userResponse.data.user;
    }

    return likes as Like[];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching likes:', error.message);
      throw new Error('Error fetching likes');
    } else {
      throw error;
    }
  }
}

// Fetch a like by its ID
export async function getLikeById(likeId: number, authToken: string): Promise<Like | null> {
  try {
    const response = await axios.get(`${apiUrl}/api/likes/${likeId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    const like = response.data.like;

    return like as Like;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching like:', error.message);
      throw new Error('Error fetching like');
    } else {
      throw error;
    }
  }
}

// Add a new like
export async function addLike(newLike: Partial<Like>, authToken: string): Promise<Like> {
  try {
    const response = await axios.post(`${apiUrl}/api/likes`, newLike, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    // Comprovem que response.data.like existeix
    if (!response.data.like) {
      console.error("API response does not contain 'like':", response.data);
      throw new Error("API response is invalid");
    }

    return response.data.like as Like; // Retornem sempre un Like
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error adding like:', error.message);
      throw new Error('Error adding like');
    } else {
      throw error;
    }
  }
}


// Update a like
export async function updateLike(likeId: number, updatedLike: Partial<Like>, authToken: string): Promise<Like> {
  try {
    const response = await axios.put(`${apiUrl}/api/likes/${likeId}`, updatedLike, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    return response.data as Like;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error updating like:', error.message);
      throw new Error('Error updating like');
    } else {
      throw error;
    }
  }
}

// Delete a like
export async function deleteLike(likeId: number, authToken: string): Promise<void> {
  try {
    await axios.delete(`${apiUrl}/api/likes/${likeId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting like:', error.message);
      throw new Error('Error deleting like');
    } else {
      throw error;
    }
  }
}
