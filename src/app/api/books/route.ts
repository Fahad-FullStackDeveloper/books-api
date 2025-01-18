import { NextResponse } from "next/server";

let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", image: "/id-1.jpg" },
  { id: 2, title: "The Power of Positive Thinking", author: "Norman Vincent Peale", image: "/id-2.jpg" },
  { id: 3, title: "Think and Grow Rich", author: "Napoleon Hill", image: "/id-3.jpg" },
  { id: 4, title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", image: "/id-4.jpg" },
  { id: 5, title: "You Are a Badass", author: "Jen Sincero", image: "/id-5.jpg" },
  { id: 6, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", image: "/id-6.jpg" },
  { id: 7, title: "Grit: The Power of Passion and Perseverance", author: "Angela Duckworth", image: "/id-7.jpg" },
  { id: 8, title: "The Alchemist", author: "Paulo Coelho", image: "/id-8.jpg" },
];


export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const book = await request.json();
  book.id = books.length + 1;
  books.push(book);
  return NextResponse.json(book, { status: 201 });
}

export async function PUT(request: Request) {
  const book = await request.json();
  const index = books.findIndex((b) => b.id === book.id);
  if (index !== -1) {
    books[index] = book;
    return NextResponse.json(book);
  }
  return NextResponse.json({ error: "Book not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  books = books.filter((book) => book.id !== id);
  return NextResponse.json({ message: "Book deleted" });
}
