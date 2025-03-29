import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookForm from "../components/BookForm";
import ReactPaginate from "react-paginate";
import { Modal, Button } from "react-bootstrap";


const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const booksPerPage = 5;

  const fetchBooks = useCallback(() => {
    axios.get("http://localhost:5000/books")
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:5000/books/${id}`);
        fetchBooks();
      } catch (error) {
        alert("Failed to delete book. Please try again.");
        console.error("Error deleting book:", error);
      }
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(0);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);
  const offset = currentPage * booksPerPage;
  const currentBooks = filteredBooks.slice(offset, offset + booksPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div style={{ 
      backgroundImage: "url('https://source.unsplash.com/1600x900/?library,bookshelf')", 
      backgroundSize: "cover", 
      backgroundPosition: "center", 
      minHeight: "100vh", 
      padding: "20px" 
    }}>
      <div className="container mt-4">
        <h2 className="text-center text-primary mb-4">📚 Book Inventory</h2>
        <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <input 
            type="text" 
            className="form-control w-100 w-md-50 shadow-sm mb-2 mb-md-0" 
            placeholder="Search by title or author..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="success" onClick={() => setShowModal(true)}>
            + Add Book
          </Button>
        </div>
        <div className="table-responsive">
          {currentBooks.length > 0 ? (
            <table className="table table-hover table-bordered mt-4 shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBooks.map((book) => (
                  <tr key={book.id} className="align-middle">
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <Link to={`/book/${book.id}`} className="btn btn-primary btn-sm me-2 shadow-sm">
                        View Details
                      </Link>
                      <Link to={`/edit/${book.id}`} className="btn btn-warning btn-sm me-2 shadow-sm">
                        Edit
                      </Link>
                      <button 
                        className="btn btn-danger btn-sm shadow-sm" 
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-muted mt-4">No books found.</p>
          )}
        </div>
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center mt-3"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item disabled"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm onBookAdded={() => { fetchBooks(); setShowModal(false); }} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
