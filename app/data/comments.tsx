import axios from 'axios';
import { Comment } from '~/types/interfaces';

const apiUrl = "http://localhost:8083";

// Fetch all comments
export async function getAllComments(authToken: string): Promise<Comment[]> {
  try {
    const response = await axios.get(`${apiUrl}/api/comments`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    const comments = response.data.comments;

    if (!Array.isArray(comments)) {
      console.error("Comments data is not an array:", response.data);
      throw new Error("Comments data is not an array");
    }

    // Fetch user details for each comment
    for (const comment of comments) {
      const userResponse = await axios.get(`${apiUrl}/api/users/${comment.user_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      comment.user = userResponse.data.user;
    }

    return comments as Comment[];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching comments:', error.message);
      throw new Error('Error fetching comments');
    } else {
      throw error;
    }
  }
}

// Fetch a comment by its ID
export async function getCommentById(commentId: number, authToken: string): Promise<Comment | null> {
  try {
    const response = await axios.get(`${apiUrl}/api/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    const comment = response.data.comment;

    return comment as Comment;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching comment:', error.message);
      throw new Error('Error fetching comment');
    } else {
      throw error;
    }
  }
}

// Add a new comment
export async function addComment(newComment: Partial<Comment>, authToken: string): Promise<Comment> {
  try {
    const response = await axios.post(`${apiUrl}/api/comments`, newComment, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    return response.data as Comment;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error adding comment:', error.message);
      throw new Error('Error adding comment');
    } else {
      throw error;
    }
  }
}

// Update a comment
export async function updateComment(commentId: number, updatedComment: Partial<Comment>, authToken: string): Promise<Comment> {
  try {
    const response = await axios.put(`${apiUrl}/api/comments/${commentId}`, updatedComment, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    return response.data as Comment;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error updating comment:', error.message);
      throw new Error('Error updating comment');
    } else {
      throw error;
    }
  }
}

// Delete a comment
export async function deleteComment(commentId: number, authToken: string): Promise<void> {
  try {
    await axios.delete(`${apiUrl}/api/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting comment:', error.message);
      throw new Error('Error deleting comment');
    } else {
      throw error;
    }
  }
}
