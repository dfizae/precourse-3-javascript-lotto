import { Console, Random } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import WinningNumberView from './view/WinningNumberView.js';
import BonusNumberView from './view/BonusNumberView.js';
import OutputView from './view/OutputView.js';
import { LottoGame } from './LottoGame.js';
import { ERROR } from './constants/Error.js';
import Lotto from './Lotto.js';

class GameController {
  #lottos = [];
  #purchaseAmount = 0;

  async start() {
    try {
      await this.#setupLottos();
      const { winningNumbers, bonusNumber } = await this.#setupWinningNumbers();
      this.#calculateAndPrintResults(winningNumbers, bonusNumber);
    } catch (error) {
      Console.print(error.message);
    }
  }

  // 1. 로또 구매 및 발매
  async #setupLottos() {
    this.#purchaseAmount = await InputView.readPurchaseAmount();
    const count = this.#purchaseAmount / 1000;
    
    this.#lottos = this.#generateLottos(count);

    OutputView.printPurchaseCount(this.#lottos.length);
    OutputView.printLottos(this.#lottos);
  }

  // 2. 당첨 번호 및 보너스 번호 입력 및 검증   
  async #setupWinningNumbers() {
    const winningNumbers = await WinningNumberView.readWinningNumbers();
    new Lotto(winningNumbers); // 당첨 번호 유효성 검사

    const bonusNumber = await BonusNumberView.readBonusNumber();
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR.BONUS_NUMBER_DUPLICATED);
    }
    
    return { winningNumbers, bonusNumber };
  }

  // 3. 당첨 통계 및 수익률 계산 및 출력
  #calculateAndPrintResults(winningNumbers, bonusNumber) {
    const stats = LottoGame.calculateStatistics(
      this.#lottos,
      winningNumbers,
      bonusNumber
    );
    
    const profitRate = LottoGame.calculateProfitRate(stats, this.#purchaseAmount);

    OutputView.printResults(stats);
    OutputView.printProfitRate(profitRate);
  }

  // 로또 생성 함수
  #generateLottos(count) {
    const lottos = [];
    for (let i = 0; i < count; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
      lottos.push(new Lotto(numbers));
    }
    return lottos;
  }
}

export default GameController;