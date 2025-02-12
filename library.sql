create database library;
use library;
CREATE TABLE Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_year INT
);

CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    published_year INT,
    genre VARCHAR(100),
    available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE CASCADE
);

CREATE TABLE Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15),
   membership_date DATE NOT NULL DEFAULT (CURRENT_DATE)

);

CREATE TABLE BorrowedBooks (
    borrow_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    member_id INT,
   borrow_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    return_date DATE NULL,
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES Members(member_id) ON DELETE CASCADE
);

INSERT INTO Authors (name, birth_year)
VALUES ('F. Scott Fitzgerald', 1896);

INSERT INTO Books (title, author_id, published_year, genre, available)
VALUES ('The Great Gatsby', 1, 1925, 'Fiction', TRUE);

INSERT INTO Members (name, email, phone)
VALUES ('John Doe', 'johndoe@example.com', '1234567890');

INSERT INTO BorrowedBooks (book_id, member_id, borrow_date)
VALUES (1, 1, CURDATE());

-- Mark the book as unavailable
UPDATE Books 
SET available = FALSE 
WHERE book_id = 1;

UPDATE BorrowedBooks 
SET return_date = CURDATE() 
WHERE book_id = 1 AND member_id = 1 AND return_date IS NULL;

UPDATE Books 
SET available = TRUE 
WHERE book_id = 1;

-- View Authors
SELECT * FROM Authors;

-- View Books
SELECT * FROM Books;

-- View Members
SELECT * FROM Members;

-- View Borrowed Books
SELECT * FROM BorrowedBooks;


