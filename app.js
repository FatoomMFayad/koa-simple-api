const getItems = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Mobile", "Mac", "Pen", "Book"]);
    }, 1000);
  });
};

const processRequest = async () => {
  const items = await getItems();
  return items;
};

processRequest()
  .then((results) => console.log(results))
  .catch((err) => console.log(err));
