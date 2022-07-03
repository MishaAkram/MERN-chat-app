
import socketIO from "socket.io";
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

import dotenv from "dotenv";
dotenv.config();

import mongoConnect from './config/mongo';
import Message from './models/message';
import fileUploader from "./controllers/fileUploader";

const io = socketIO(process.env.SOCKET_PORT);
const app = express();