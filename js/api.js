const BASE_URL = 'http://localhost:3000'
const BOOKS_URL = `${BASE_URL}/books`

const getBooks = () => {
    fetch(`${BOOKS_URL}`).then(response => response.json())
} 


API = {
    getBooks()
}