import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-5 text-secondary">Loading book details...</p>;
  }

  if (!book) {
    return <p className="text-center mt-5 text-danger">Book not found.</p>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-primary text-center mb-3">{book.title}</h2>
        <p className="text-muted text-center">{book.author}</p>
        <hr />
        <p><strong>📅 Published Date:</strong> {book.publishedDate}</p>
        <p><strong>🏢 Publisher:</strong> {book.publisher}</p>
        <p><strong>📖 Description:</strong> {book.description}</p>
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-outline-primary me-2">🔙 Back to Home</Link>
          <Link to={`/edit/${book.id}`} className="btn btn-warning">✏️ Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
