import 'dotenv/config';
import { connectDB } from "./db/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    app.on("error", (error) => {
      console.log("Error connecting to MongoDB:", error);
    });
    
    app.get("/", (req, res) => {
      res.send("Hello World");
    });

  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
