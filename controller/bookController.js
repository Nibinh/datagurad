const Book = require("../models/bookModel");

//create a Book
const createBook = async (req, res) => {
  try {
    const { name, author, title, category, publishedYear } = req.body;
    if (!name || !author || !title || !category || !publishedYear)
      return res.status(400).send("Fill all feilds");
    await Book.create({
      name,
      author,
      title,
      category,
      publishedYear,
    });
    res.status(200).send("Book Created");
  } catch (error) {
    res.status(500).json({ message: "Something Error" + error.message });
  }
};

//getting book
const getBook = async (req, res) => {
  try {
    let query = Book.find().sort("-createdAt");

    const filter = {};
    if (req.query.search) {
      console.log(req.query.search);
      const regexQuery = new RegExp(req.query.search, "i");
      filter.$or = [{ name: regexQuery }, { title: regexQuery }];
    }
    query = query.find(filter);
    const data = await query;
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ message: "Something Error" + error.message });
  }
};

//editBook

const editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, title, category } = req.body;

    const isExcisting = await Book.findOne({ _id: id });
    if (!isExcisting) return res.status(400).send("Book not Found");

    const update = await Book.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          name,
          author,
          title,
          category,
        },
      }
    );
    const updated = await Book.findOne({ _id: isExcisting._id });
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).json({ message: "Something Error" + error.message });
  }
};

//delete book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const isExcisting = await Book.findOne({ _id: id });
    if (!isExcisting) return res.status(400).send("Book not Found");

    await Book.deleteOne({ _id: isExcisting._id });
    res.status(200).send("deleted");
  } catch (error) {
    res.status(500).json({ message: "Something Error" + error.message });
  }
};
module.exports = {
  createBook,
  getBook,
  editBook,
  deleteBook,
};
