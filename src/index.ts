// Libraries
import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';

// Routes
import routes from "./routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use("/", routes);

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
