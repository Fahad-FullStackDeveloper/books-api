"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch("/api/books");
    const data = await response.json();
    setBooks(data);
  };

  const handleAddOrUpdateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingBook ? "PUT" : "POST";
    const endpoint = "/api/books";
    const payload = editingBook
      ? { id: editingBook.id, title, author, image }
      : { title, author, image };

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setTitle("");
      setAuthor("");
      setImage("");
      setEditingBook(null);
      fetchBooks();
    }
  };

  const handleDeleteBook = async (id: number) => {
    const response = await fetch("/api/books", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      fetchBooks();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8"> Active Book Store</h1>
      <h3>self created using CRUD method</h3>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md p-6">
            <Image
              src={book.image}
              alt={book.title}
              width={200}
              height={300}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-bold">{book.title}</h3>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  setEditingBook(book);
                  setTitle(book.title);
                  setAuthor(book.author);
                  setImage(book.image);
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBook(book.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          {editingBook ? "Edit Book" : "Add New Book"}
        </h2>
        <form onSubmit={handleAddOrUpdateBook} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book Title"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            required
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingBook ? "Update" : "Add"} Book
            </button>
            {editingBook && (
              <button
                type="button"
                onClick={() => setEditingBook(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
