import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import WinningNumberView from './view/WinningNumberView.js';

class App {
  async run() {
    try{
      const amount = await InputView.readPurchaseAmount();
      const winningNumbers = await WinningNumberView.readWinningNumbers();
      const bonusNumber = await WinningNumberView.readBonusNumber(winningNumbers);
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default App;
