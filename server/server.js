const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;
const storePath = path.join(__dirname, 'store.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Function to read data from the JSON file
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(storePath, 'utf8'); 
 
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return { posts: [], authors: [] };
  }
};

// Function to write data to the JSON file
const writeDataToFile = (data) => {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2));
};

// Declare store at the top
let store = readDataFromFile();

// Routes for posts-----------------------------------------------------------------------------------------------

app.get('/api/posts', (req, res) => {
  res.send(store.posts);
});

app.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = store.posts.find(p => p.id === id);

  if (post) {
    res.send(post);
  } else {
    res.status(404).send({ error: 'Post not found' });
  }
});

app.post('/api/posts', (req, res) => {

  const post = req.body;
  console.log(req.headers);
  console.log('Received post data:', post);
  if (post.id === undefined || post.title === undefined || post.author.firstName === undefined || post.views === undefined || post.reviews === undefined) {
    res.status(400).send({ error: 'Missing required fields' });
    return;
  }
  const index = store.posts.findIndex((p)=>{
    if(p.id===post.id)
      return post.id;
    return -1;
  });
  if (index !==-1) {
    res.status(404).send({ error: 'id already exist' });
    return;
  }
  store.posts.push(post);
  writeDataToFile(store);
  res.send({ message: 'Post added successfully' });
});

app.put('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const updatedPost = req.body;
  console.log('sdvv',updatedPost);

  const index = store.posts.findIndex((p)=>{
    console.log(p.id);
    if(p.id===id)
      return id;
    return -1;
  });
  if (index === -1) {
    res.status(404).send({ error: 'Post not found' });
    return;
  }

  store.posts[index] = updatedPost;
  writeDataToFile(store);
  res.send({ message: 'Post updated successfully' });
});

app.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  const index = store.posts.findIndex(p => {
   
    if(p.id===id)
      return id;
    return -1;
  }); 
  console.log('Received post data:', index);
  if (index === -1) {
    res.status(404).send({ error: 'Post not found' });
    return;
  }

  store.posts.splice(index, 1);
  writeDataToFile(store);
  res.send({ message: 'Post deleted successfully' });
});


// Routes for authors------------------------------------------------------------------------------------------


app.get('/api/authors', (req, res) => {
  res.send(store.authors);
});

app.get('/api/authors/:id', (req, res) => {
  const id = req.params.id;
  const author = store.authors.find(a => a.id === id);

  if (author) {
    res.send(author);
  } else {
    res.status(404).send({ error: 'Author not found' });
  }
});

app.post('/api/authors', (req, res) => {
  const author = req.body;
  console.log(req.headers);

  console.log('Received post data:', author);


  if (author.id===undefined || author.firstName===undefined || author.post===undefined) {
    res.status(400).send({ error: 'Missing required fields' });
    return;
  }
  
  const index = store.authors.findIndex((p)=>{
    if(p.id===author.id)
      return author.id;
    return -1;
  });
  if (index !==-1) {
    res.status(404).send({ error: 'id already exist' });
    return;
  }
  store.authors.push(author);
  writeDataToFile(store);
  res.send({ message: 'Author added successfully' });
});


app.put('/api/authors/:id', (req, res) => {
  const id = req.params.id;
  const updatedAuthor = req.body;
  console.log('sdvv',updatedAuthor);

  const index = store.authors.findIndex((p)=>{
    console.log(p.id);
    if(p.id===id)
      return id;
    return -1;
  });
  if (index === -1) {
    res.status(404).send({ error: 'Author not found' });
    return;
  }

  store.authors[index] = updatedAuthor;
  writeDataToFile(store);
  res.send({ message: 'Author updated successfully' });
});


app.delete('/api/authors/:id', (req, res) => {
  const id = req.params.id;
  const index = store.authors.findIndex(p => {
    if(p.id===id)
      return id;
    return -1;
  }); 
  if (index === -1) {
    res.status(404).send({ error: 'Author not found' });
    return;
  }
  store.authors.splice(index, 1);
  writeDataToFile(store);
  res.send({ message: 'Author deleted successfully' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});