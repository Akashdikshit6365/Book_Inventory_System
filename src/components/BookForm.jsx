import { useState } from "react";
import axios from "axios";

const BookForm = ({ onBookAdded }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishedDate: "",
    isbn: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.genre || !book.publishedDate || !book.isbn) {
      alert("Please fill in all required fields!");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/books", book);
      onBookAdded();
      setBook({ title: "", author: "", genre: "", publishedDate: "", isbn: "", description: "" });
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: "600px", width: "100%", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 fw-bold text-primary">📚 Add a New Book</h3>
        <form onSubmit={handleSubmit}>
          {["title", "author", "genre", "isbn"].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label fw-bold text-secondary">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input type="text" className="form-control shadow-sm" name={field} value={book[field]} onChange={handleChange} required />
            </div>
          ))}
          <div className="mb-3">
            <label className="form-label fw-bold text-secondary">Published Date</label>
            <input type="date" className="form-control shadow-sm" name="publishedDate" value={book.publishedDate} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-secondary">Description</label>
            <textarea className="form-control shadow-sm" name="description" rows="3" value={book.description} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100 shadow-sm" disabled={loading}>
            {loading ? "Adding..." : "➕ Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
