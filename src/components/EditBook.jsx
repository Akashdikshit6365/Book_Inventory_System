import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", publishedDate: "", publisher: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching book:", error);
        alert("Failed to fetch book details.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/books/${id}`, book);
      alert("Book updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center mt-5 text-secondary">Loading book details...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center text-warning mb-4">✏️ Edit Book</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            name="title" 
            className="form-control" 
            value={book.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input 
            type="text" 
            name="author" 
            className="form-control" 
            value={book.author} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Published Date</label>
          <input 
            type="date" 
            name="publishedDate" 
            className="form-control" 
            value={book.publishedDate} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Publisher</label>
          <input 
            type="text" 
            name="publisher" 
            className="form-control" 
            value={book.publisher} 
            onChange={handleChange} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea 
            name="description" 
            className="form-control" 
            value={book.description} 
            onChange={handleChange} 
            rows="3"
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success me-2">✅ Update</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>❌ Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
