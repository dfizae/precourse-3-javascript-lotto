import GameController from './GameController.js';

class App {
  async run() {
    const game = new GameController();
    await game.start();
  }
}

export default App;