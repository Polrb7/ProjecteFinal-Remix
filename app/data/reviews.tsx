import axios from "axios";
import { Review } from "~/types/interfaces";

const apiUrl = "http://localhost:8083";



export async function getAllReviews(authToken: string): Promise<Review[]> {
  const response = await axios.get(`${apiUrl}/api/reviews`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const reviews = response.data.reviews;

  // Fetch user and book details for each review
  for (const review of reviews) {
    const userResponse = await axios.get(`${apiUrl}/api/users/${review.user_id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    review.user = userResponse.data.user;

    const bookResponse = await axios.get(`${apiUrl}/api/books/${review.book_id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    review.book = bookResponse.data.book;
  }

  return reviews;
}

export async function getReviewById(id: number, authToken: string): Promise<Review> {
  try {
    const response = await axios.get(`${apiUrl}/api/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    console.log("Review response:", response.data.review); // Log the response

    const review = response.data.review;

    return review as Review;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching review:", error.message);
      throw new Error("Error fetching review");
    } else {
      throw error;
    }
  }
}

export async function createReview(review: Review, authToken: string): Promise<Review> {
  const response = await axios.post(`${apiUrl}/api/reviews`, review, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
}

export async function updateReview(id: number, review: Review, authToken: string): Promise<Review> {
  const response = await axios.put(`${apiUrl}/api/reviews/${id}`, review, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
}

export async function deleteReview(id: number, authToken: string): Promise<void> {
  await axios.delete(`${apiUrl}/api/reviews/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
