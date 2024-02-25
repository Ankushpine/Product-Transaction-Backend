const Products = require("../model/Product-Model");

// For fetching the data intially whenever the server start.
module.exports.fetching = async () => {
  try {

    //To delete earlier fetched data form the database.
    await Products.deleteMany();

    const thirdPartyDatas = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    if (!thirdPartyDatas.ok)
      console.log("Products not fetched from third party api");

    const data = await thirdPartyDatas.json();

    const product = await Products.insertMany(data);

    if (!product) console.log("Products not inserted to database");

    console.log("Data is successfully fetched and stored in database.");
  } catch (error) {
    console.log(`Error in fetching the data due to :: ${error}`);
  }
};
