import express from 'express'
import { link } from '../controller/controll.js';
const Route=express.Router();
Route.post("/",link);
export default Route;
