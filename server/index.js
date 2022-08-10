const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

//set up server

const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    credentials: true,
  })
);

//connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return console.error(err);
    else {
      console.log("Connected to MongoDB");
    }
  }
);

//set up routes
//admin route
app.use("/admin", require("./routers/adminRouter"));
app.use("/coach", require("./routers/coachRouter"));
app.use("/member", require("./routers/memberRouter"));
app.use("/auth", require("./routers/userRouter"));
app.use("/kid", require("./routers/kidRouter"));
