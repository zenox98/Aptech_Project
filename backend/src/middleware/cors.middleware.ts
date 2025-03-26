import cors from "cors"
import { CorsOptions } from "cors";

// Define CORS options (optional, but good practice)
const corsOptions: CorsOptions = {
  origin: '*', // Allow all origins (for development, restrict in production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  credentials: true, // Allow cookies to be sent back
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const corsMiddleWare = cors(corsOptions);
