import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PromotionRouter } from './api/routes/promotion.route';

const port = process.env.PORT || 8080;

// Create Express server
const app = express();

// Set cors
app.use(cors());

// Handle post body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set routes
app.use('/promotion', new PromotionRouter().router);

// Start the Express server
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;