import express from "express";
import cors from 'cors'
import 'dotenv/config.js'

const PORT = process.env.PORT || 9002;
const router = express.Router();

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// Mount the router on the /api/v1 prefix
app.use('/api/v1', router);

router.get('/', async (req, res) => {
    res.status(200).send("Root route");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default router;
