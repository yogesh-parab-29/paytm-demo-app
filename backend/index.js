const express = require("express");
const cors = require("cors");
// import {router as routeRouter} from "./routes/index";
const rootRouter = require("./routes/index");


const app = express();
app.use(express.json());
app.use(cors());

app.use('api/v1', rootRouter)

app.listen(3000, () => console.log("Server started on port 3000"))