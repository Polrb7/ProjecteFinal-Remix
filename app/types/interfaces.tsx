export type ValidationErrors = {
	title?: string
	amount?: string
	date?: string
}

export interface LoginInput {
	email: string
	password: string
}

export interface ShowErrors {
	title?: string
	code?: string
}

export interface User {
	id: number
	name: string
	surname: string
	username: string
	age: number
	email: string
	password: string
	admin: boolean
	profile_img: string
	created_at: string
	updated_at: string
}

export interface Book {
	id: number
	user_id: number
	title: string
	author: string
	genre: string
	description: string
	book_img: string
	created_at: string
	updated_at: string
}

export interface Review {
	id: number
	user_id: number
	book_id: number
	title: string
	text: string
	valoration: number
	created_at: string
	updated_at: string
}

export interface Comment {
	id: number
	user_id: number
	review_id: number
	comment: string
	created_at: string
	updated_at: string
}

export interface Like {
	id: number
	user_id: number
	book_id: number
	created_at: string
	updated_at: string
}



