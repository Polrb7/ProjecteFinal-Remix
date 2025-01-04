import axios from 'axios';
import { Book } from '~/types/interfaces';

const apiUrl = "http://localhost:8083";

// Fetch all books
export async function getAllBooks(authToken: string): Promise<Book[]> {
    try {
        const response = await axios.get(`${apiUrl}/api/getAllBooks`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true,
        });

        return response.data.books as Book[];
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching books:', error.message);
            throw new Error('Error fetching books');
        } else {
            throw error;
        }
    }
}

// Add a new book
export async function addBook(newBook: Partial<Book>, authToken: string): Promise<Book> {
    try {
        const response = await axios.post(`${apiUrl}/api/addBook`, newBook, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true,
        });

        return response.data as Book;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error adding book:', error.message);
            throw new Error('Error adding book');
        } else {
            throw error;
        }
    }
}

// Fetch a book by its ID
export async function getBookById(bookId: number, authToken: string): Promise<Book | null> {
    try {
        const response = await axios.get(`${apiUrl}/api/getBookById?id=${bookId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true,
        });

        return response.data as Book;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching book:', error.message);
            throw new Error('Error fetching book');
        } else {
            throw error;
        }
    }
}

// Update a book
export async function updateBook(bookId: number, updatedBook: Partial<Book>, authToken: string): Promise<Book> {
    try {
        const response = await axios.put(`${apiUrl}/api/updateBook?id=${bookId}`, updatedBook, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true,
        });

        return response.data as Book;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error updating book:', error.message);
            throw new Error('Error updating book');
        } else {
            throw error;
        }
    }
}

// Delete a book
export async function deleteBook(bookId: number, authToken: string): Promise<void> {
    try {
        await axios.delete(`${apiUrl}/api/deleteBook?id=${bookId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true,
        });
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error deleting book:', error.message);
            throw new Error('Error deleting book');
        } else {
            throw error;
        }
    }
}

// Fetch all books for a specific user
export async function getAllBooksByUser(userId: number, authToken: string): Promise<Book[]> {
    try {
        const response = await axios.get(`${apiUrl}/api/getAllBooksByUser?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true,
        });

        return response.data as Book[];
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching books for user:', error.message);
            throw new Error('Error fetching books for user');
        } else {
            throw error;
        }
    }
}
