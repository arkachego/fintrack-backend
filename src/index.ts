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

const corsOrigin = process.env.NODE_ENV === 'production' ? `https://${process.env.AUTHORIZED_DOMAIN}` : `http://${process.env.AUTHORIZED_DOMAIN}:5173`;
app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));
app.use("/", routes);

app.listen(port, () => {
  console.log(`Backend server is running on ${corsOrigin}`);
});
