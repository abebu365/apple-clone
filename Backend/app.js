
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const myDBconnection = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "apple-clone",
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
});

app.get("/createTable", (req, res) => {
  let userTable = `CREATE TABLE if not exists userTable(
    user_id int auto_increment,
    user_name varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id)
  )`;

  let productTable = `CREATE TABLE if not exists products(
    product_id int auto_increment,
    product_url varchar(255) not null,
    product_name varchar(255) not null,
    PRIMARY KEY(product_id)
  )`;

  let ProductDescriptionTable = `CREATE TABLE if not exists ProductDescription(
    description_id int auto_increment,
    product_id int not null,
    product_brief_description TEXT not null,
    product_description TEXT not null,
    product_img varchar(255) not null,
    product_link varchar(255) not null,
    PRIMARY KEY (description_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
  )`;

  let ProductPriceTable = `CREATE TABLE if not exists ProductPrice(
    price_id int auto_increment,
    product_id int not null,
    starting_price varchar(255) not null,
    price_range varchar(255) not null,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
  )`;

  let orderTable = `CREATE TABLE if not exists orderTable(
    order_id int auto_increment,
    product_id int not null,
    user_id int not null,
    PRIMARY KEY (order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (user_id) REFERENCES userTable(user_id)
  )`;

  let allTables = `${userTable}; ${productTable}; ${ProductDescriptionTable}; ${ProductPriceTable}; ${orderTable}`;
  myDBconnection.query(allTables, (err, results, field) => {
    if (err) {
      console.error("Error creating database tables:", err);
      return res
        .status(500)
        .json({ error: "Failed to create database tables" });
    } else {
      return res.send("All tables created successfully!");
    }
  });
});


function startconnection() {
  const port = 8900;
  app.listen(port, () => {
    console.log(`server is listening to port : ${port}`);
  });
}
startconnection();

app.get("/", (req, res) => {
  res.send("Server is running perfectly!");
});


app.post("/addiphones", (req, res) => {

  const {
    user_name,
    user_password,
    product_name,
    product_url,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    starting_price,
    price_range,
  } = req.body;

  const userData =
    "INSERT INTO userTable (user_name, user_password) VALUES (?, ?)";
  myDBconnection.query(
    userData,
    [user_name, user_password],
    (err, userResult) => {
      console.log(userResult);
      if (err) {
        console.log(err);
        return res.send("Error inserting user data");
      }

      const generatedUserId = userResult.insertId;

      const productData =
        "INSERT INTO products (product_url, product_name) VALUES (?, ?)";
      myDBconnection.query(
        productData,
        [product_url, product_name],
        (err, productResult) => {
          if (err) {
            console.log(err);
            return res.send("Error inserting product data");
          }

          const generatedProductId = productResult.insertId;

          const descData = `INSERT INTO ProductDescription 
        (product_id, product_brief_description, product_description, product_img, product_link) 
        VALUES (?, ?, ?, ?, ?)`;

          myDBconnection.query(
            descData,
            [
              generatedProductId,
              product_brief_description,
              product_description,
              product_img,
              product_link,
            ],
            (err) => {
              if (err) {
                console.log(err);
                return res.send("Error inserting description data");
              }

              const priceData =
                "INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES (?, ?, ?)";
              myDBconnection.query(
                priceData,
                [generatedProductId, starting_price, price_range],
                (err) => {
                  if (err) {
                    console.log(err);
                    return res.send("Error inserting price data");
                  }

                  const orderData =
                    "INSERT INTO orderTable (product_id, user_id) VALUES (?, ?)";
                  myDBconnection.query(
                    orderData,
                    [generatedProductId, generatedUserId],
                    (err) => {
                      if (err) {
                        console.log(err);
                        return res.send("Error inserting order data");
                      }

                      res.send("All data inserted successfully!");
                    },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
});


app.get("/getAllProducts", (req, res) => {
  let getAllProducts = `SELECT
  p.product_id,
  p.product_name,
  p.product_url,
  pd.product_brief_description,
  pd.product_description,
  pd.product_img,
  pd.product_link,
  pp.starting_price,
  pp.price_range
  FROM products p
  LEFT JOIN ProductDescription pd ON p.product_id = pd.product_id
  LEFT JOIN ProductPrice pp ON p.product_id = pp.product_id
  `;
  myDBconnection.query(getAllProducts, (err, data, field) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(503).json({ error: "Unable to fetch products" });
    }
    return res.json(data);
  });
});


app.get("/getSingleProduct/:product_id", (req, res) => {
  const { product_id } = req.params;
  const selectSingleProduct = `SELECT
  p.product_id,
  p.product_name,
  p.product_url,
  pd.product_brief_description,
  pd.product_description,
  pd.product_img,
  pd.product_link,
  pp.starting_price,
  pp.price_range
  FROM products p
  LEFT JOIN ProductDescription pd ON p.product_id = pd.product_id
  LEFT JOIN ProductPrice pp ON p.product_id = pp.product_id
  WHERE p.product_id = ?;`;
  myDBconnection.query(
    selectSingleProduct,
    [product_id],
    (err, data, field) => {
      if (err) {
        console.error("Error fetching product:", err);
        return res.status(503).json({ error: "Unable to fetch product" });
      }
      return res.json(data);
    },
  );
});

