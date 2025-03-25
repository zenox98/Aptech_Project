import express, {Express, Request, Response} from "express"
import cors from "cors";
import productRouter from "./apis/products/product.ts";

const app : Express = express()
const port : number = 3000

// Enable CORS for all origins (for developement; configure more restrictively in production)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount the product routes
app.use('/api/products', productRouter);

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`\n\napi is running at http://localhost:${port}/api/products.`)
  console.log(`\nServer runnig on http://localhost:${port}.`)
})
