// src/App.js
import { Console, Random } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import WinningNumberView from './view/WinningNumberView.js';
import BonusNumberView from './view/BonusNumberView.js';
import Lotto from './Lotto.js';
import { ERROR } from './constants/Error.js';

class App {
  async run() {
    try {
      const amount = await InputView.readPurchaseAmount();
      const winningNumbers = await WinningNumberView.readWinningNumbers();
      const bonusNumber = await BonusNumberView.readBonusNumber();

      // Lotto 모델 검증 (당첨 번호)
      const winningLotto = new Lotto(winningNumbers);

      // 보너스 번호와 당첨 번호 중복 검사
      if (winningLotto.getNumbers().includes(bonusNumber)) {
        throw new Error(ERROR.BONUS_NUMBER_DUPLICATED);
      }

      // 구매 수만큼 랜덤 로또 생성
      const lottos = this.#generateLottos(amount);

      Console.print(`\n${lottos.length}개를 구매했습니다.`);
      lottos.forEach(lotto => Console.print(`[${lotto.getNumbers().join(', ')}]`));

    } catch (error) {
      Console.print(error.message);
    }
  }

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
