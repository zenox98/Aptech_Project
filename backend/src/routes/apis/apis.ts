import { Router } from "express";

// all methods apis
import postAPIS from "./post/post.ts";
import getAPIS from "./get/get.ts"
import putAPIS from "./put/put.ts"
import deleteAPIS from "./delete/delete.ts";


const route : Router = Router();

route.use('/post', postAPIS)
// route.use('/get', getAPIS)
// route.use('/put' ,putAPIS)
// route.use('delete' ,deleteAPIS)

export default route;
