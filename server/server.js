const express = require('express');
const cors = require('cors');
const pokerUtils = require('./pokerUtils');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/probability', (req, res) => {
    const { hand, communityCards } = req.query;
    const probability = pokerUtils.calculateWinProbability(hand, communityCards);
    res.json({ probability });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});