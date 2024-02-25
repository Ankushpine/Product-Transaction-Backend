const Products = require("../model/Product-Model");
const fetch = require("node-fetch");

module.exports.transactions = async (req, res) => {
  try {
    const { page, search } = req.query;

    // Filtering
    let query = {},
      option = {},
      limit = 10;
    if (search) {
      if (!isNaN(search)) {
        query = {
          price: { $lte: parseFloat(search) },
        };

        option = { price: -1 };
        limit = 4;
      } else {
        query = {
          $text: { $search: search, $caseSensitive: false },
        };

        option = { score: { $meta: "textScore" } };
      }
    }

    const totalProductsCount = await Products.countDocuments(query);

    const data = await Products.find(query)
      .sort(option)
      .skip((page - 1) * 10)
      .limit(limit);

    if (!isNaN(search) && search !== "")
      return res.status(200).json({ totalProductsCount: 4, products: data });

    res.status(200).json({
      totalProductsCount,
      products: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error -product fetch - ${error}`);
  }
};

module.exports.statistics = async (req, res) => {
  try {
    let { month } = req.query;

    if (month == "January") month = "01";
    else if (month == "Feburary") month = "02";
    else if (month == "March") month = "03";
    else if (month == "April") month = "04";
    else if (month == "May") month = "05";
    else if (month == "June") month = "06";
    else if (month == "July") month = "07";
    else if (month == "August") month = "08";
    else if (month == "September") month = "09";
    else if (month == "October") month = "10";
    else if (month == "November") month = "11";
    else if (month == "December") month = "12";
    else return res.status(400).json({ message: "Provide the correct month" });

    if (!month) return res.status(400).json({ message: "Provide month" });
    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseFloat(month)],
      },
    };
    const data = await Products.find(query);

    const totalSaleAmount = data.reduce(
      (acc, product) => acc + product.price,
      0
    );
    const soldItem = data.filter((product) => product.sold === true).length;
    const notSoldItem = data.filter((product) => product.sold !== true).length;

    res.status(200).json({
      totalSaleAmount,
      soldItem,
      notSoldItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error -product fetch - ${error}`);
  }
};

module.exports.priceRange = async (req, res) => {
  try {
    let { month } = req.query;

    if (month == "January") month = "01";
    else if (month == "Feburary") month = "02";
    else if (month == "March") month = "03";
    else if (month == "April") month = "04";
    else if (month == "May") month = "05";
    else if (month == "June") month = "06";
    else if (month == "July") month = "07";
    else if (month == "August") month = "08";
    else if (month == "September") month = "09";
    else if (month == "October") month = "10";
    else if (month == "November") month = "11";
    else if (month == "December") month = "12";
    else return res.status(400).json({ message: "Provide the correct month" });

    if (!month) return res.status(400).json({ message: "Provide month" });
    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseFloat(month)],
      },
    };
    const data = await Products.find(query);

    const priceRanges = {
      "0 - 100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    data.map((product) => {
      const price = product.price;
      if (price <= 100) priceRanges["0 - 100"] += 1;
      else if (100 < price && price <= 200) priceRanges["101-200"] += 1;
      else if (200 < price && price <= 300) priceRanges["201-300"] += 1;
      else if (300 < price && price <= 400) priceRanges["301-400"] += 1;
      else if (400 < price && price <= 500) priceRanges["401-500"] += 1;
      else if (500 < price && price <= 600) priceRanges["501-600"] += 1;
      else if (600 < price && price <= 700) priceRanges["601-700"] += 1;
      else if (700 < price && price <= 800) priceRanges["701-800"] += 1;
      else if (800 < price && price <= 900) priceRanges["801-900"] += 1;
      else if (price > 900) priceRanges["901-above"] += 1;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error -product fetch - ${error}`);
  }
};

module.exports.piechart = async (req, res) => {
  try {
    let { month } = req.query;

    if (month == "January") month = "01";
    else if (month == "Feburary") month = "02";
    else if (month == "March") month = "03";
    else if (month == "April") month = "04";
    else if (month == "May") month = "05";
    else if (month == "June") month = "06";
    else if (month == "July") month = "07";
    else if (month == "August") month = "08";
    else if (month == "September") month = "09";
    else if (month == "October") month = "10";
    else if (month == "November") month = "11";
    else if (month == "December") month = "12";
    else return res.status(400).json({ message: "Provide the correct month" });

    if (!month) return res.status(400).json({ message: "Provide month" });
    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseFloat(month)],
      },
    };
    const data = await Products.find(query);

    const categories = {};

    data.map((product) => {
      if (categories[product.category]) {
        categories[product.category] += 1;
      } else {
        categories[product.category] = 1;
      }
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error -product fetch - ${error}`);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    let { month } = req.query;

    if (
      month !== "January" &&
      month !== "Feburary" &&
      month !== "March" &&
      month !== "April" &&
      month !== "May" &&
      month !== "June" &&
      month !== "July" &&
      month !== "August" &&
      month !== "September" &&
      month !== "October" &&
      month !== "November" &&
      month !== "December"
    ) {
      return res.status(400).json({ message: "Provide the correct month" });
    }

    if (!month) return res.status(400).json({ message: "Provide month" });

    // promise all for fetch all the link continusly fetching
    const [staticks, barChat, pieChar] = await Promise.all([
      fetch(`http://localhost:5000/api/statistics?month=${month}`).then(
        (response) => response.json()
      ),
      fetch(`http://localhost:5000/api/pricerange?month=${month}`).then(
        (response) => response.json()
      ),
      fetch(`http://localhost:5000/api/piechart?month=${month}`).then(
        (response) => response.json()
      ),
    ]);

    // response
    res.status(200).json({
      staticks,
      barChat,
      pieChar,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Internal server error -product fetch - ${error}`);
  }
};

