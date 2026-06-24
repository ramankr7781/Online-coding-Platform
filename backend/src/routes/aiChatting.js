const express = require('express');
const aiRouter =  express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const solveDoubt = require('../controllers/solveDoubt');
const reviewCode = require('../controllers/reviewCode');

aiRouter.post('/chat', userMiddleware, solveDoubt);
aiRouter.post('/review', userMiddleware, reviewCode);

module.exports = aiRouter;