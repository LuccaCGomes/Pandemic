const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');
const initGame = require('./game/initGame');

const app = express();
app.use(cors());
app.use(express.json());

app.locals.gameState = null;
app.use((req, res, next) => {
  req.gameState = req.app.locals.gameState;
  next();
});

app.use('/game', gameRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
