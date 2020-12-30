import { sleep } from '../utils';
import BookService from '../services/BookService';

// {books: {books: [], loading: false, error: null}, auth: {}, }

// action types

export const BOOK_SUCCESS = 'BOOK_SUCCESS';
export const BOOK_START = 'BOOK_START';
export const BOOK_FAIL = 'BOOK_FAIL';

// action creators
const bookSuccess = (books) => ({
  type: BOOK_SUCCESS,
  books,
});
const bookStart = () => ({
  type: BOOK_START,
});
const bookFail = (error) => ({
  type: BOOK_FAIL,
  error,
});

// thunk
export const getBooksThunk = (token) => async (dispatch, getState) => {
  try {
    dispatch(bookStart());

    await sleep(2000);

    const books = await BookService.getBooks(token);

    dispatch(bookSuccess(books));
  } catch (error) {
    console.log(error);
    dispatch(bookFail(error));
  }
};

// promise
export const BOOKS = 'BOOKS';
export const BOOKS_PENDING = 'BOOKS_PENDING';
export const BOOKS_FULFILLED = 'BOOKS_FULFILLED';
export const BOOKS_REJECTED = 'BOOKS_REJECTED';

export const getBooksPromise = (token) => ({
  type: BOOKS,
  payload: BookService.getBooks(token + 'j'),
});
