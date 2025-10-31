import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';

class App {
  async run() {
    try{
      const purchase = await new InputView().inputPurchase();
      Console.print(purchase);
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default App;
