import express, { Request, Response } from "express";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server running with CommonJS setup!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
