// src/App.js
import { Console, Random } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import WinningNumberView from './view/WinningNumberView.js';
import BonusNumberView from './view/BonusNumberView.js';
import { ERROR } from './constants/Error.js';
import Lotto from './Lotto.js';

class App {
  async run() {
    try {
      // 구입 금액 입력
      const amount = await InputView.readPurchaseAmount();

      // 로또 발행
      const lottos = this.#generateLottos(amount);

      // 출력
      OutputView.printPurchaseCount(lottos.length);
      OutputView.printLottos(lottos);

      // 당첨 번호 입력
      const winningNumbers = await WinningNumberView.readWinningNumbers();

      // 보너스 번호 입력
      const bonusNumber = await BonusNumberView.readBonusNumber();

      // 로또 검증
      const winningLotto = new Lotto(winningNumbers);
      if (winningLotto.getNumbers().includes(bonusNumber)) {
        throw new Error(ERROR.BONUS_NUMBER_DUPLICATED);
      }
      
    } catch (error) {
      Console.print(error.message);
    }
  }

  // 로또 생성 함수
  #generateLottos(amount) {
    const count = amount / 1000;
    const lottos = [];

    for (let i = 0; i < count; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
      lottos.push(new Lotto(numbers));
    }

    return lottos;
  }
}

export default App;
