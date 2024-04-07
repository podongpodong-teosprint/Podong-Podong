import axios from "axios";

export const searchBook = async (title) => {
    const URL = import.meta.env.VITE_BOOK_API_URL+`?query=${title}&target=title`;
    const key = `KakaoAK ${import.meta.env.VITE_BOOK_API_KEY}`;

    const response =  await axios({
        method: "get",
        headers: {
            "Authorization": key
        },
        url: URL
    })

    return response.data.documents.map(book => {
        return {
            title: book.title,
            authors: book.authors,
            contents: book.contents,
            publisher: book.publisher,
            thumbnail: book.thumbnail
        }
    })
}