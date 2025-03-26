import e, { Router } from "express";

// post apis
import postCreateNewTable from "./postCreateNewTable/postCreateNewTable.ts"
import postExcelData from "./postExcelData/postExcelData.ts"

const route : Router = e.Router();

route.use('/createNewTable', postCreateNewTable);
route.use('/importExcelData' ,postExcelData);

export default route;
