import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import WinningNumberView from './view/WinningNumberView.js';

class App {
  async run() {
    try{
      const amount = await InputView.readPurchaseAmount();
      const winningNumbers = await WinningNumberView.readWinningNumbers();
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default App;
