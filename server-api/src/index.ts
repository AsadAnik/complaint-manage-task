import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import { AppDataSourceHandler } from "./lib/data-source";
import { authRoute, userRoute, ticketRoute } from "./routes";

// Load environment variables from .env file
config();

const app = express();

// Initialize the database connection before starting the server
AppDataSourceHandler.initialize()
  .then(() => {
    // Middlewares
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // CORS setting
    app.use(
      cors({
        origin: ["http://localhost:3000", "http://localhost:5173"],
        credentials: true, // Allow cookies and credentials
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      })
    );

    // API Routes..
    app.use("/api/auth", authRoute);
    app.use("/api/user", userRoute);
    app.use("/api/ticket", ticketRoute);

    // Error handling middleware
    app.use((err: Error, _req: Request, res: Response | any, _next: NextFunction) => {
      console.error(err.stack);

      // Handle JSON parsing errors
      if (err instanceof SyntaxError) {
        return res.status(400).json({ message: "Invalid JSON" });
      }

      // handle request validation
      if (err.message.includes("invalid_type")) {
        return res
          .status(400)
          .json({ message: "Invalid Request", error: JSON.parse(err.message) });
      }

      res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
        status: (err as any).status ?? 500,
      });
    });

    // Not Found handler
    app.use("*", (_req: Request, res: Response) => {
      res.status(404).json({ message: "Not Found" });
    });

    // Starting the server
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch((err) => {
    console.log("Failed to start the app", err);
    process.exit(1);
  });
