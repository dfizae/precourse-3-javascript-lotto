import { Console, Random } from '@woowacourse/mission-utils';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import { LottoCalculator } from '../services/LottoCalculator.js';
import Lotto from '../models/Lotto.js';

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

  // 1. 로또 구매 및 발매 그리고 구매한 로또의 6자리 번호 출력
  async #setupLottos() {
    this.#purchaseAmount = await InputView.readPurchaseAmount();
    const count = this.#purchaseAmount / 1000;
    
    // 로또 6자리 출력
    this.#lottos = this.#generateLottos(count);

    OutputView.printPurchaseCount(this.#lottos.length);
    OutputView.printLottos(this.#lottos);
  }

  // 2. 당첨 번호 및 보너스 번호 입력
  async #setupWinningNumbers() {
    const winningNumbers = await InputView.readWinningNumbers();

    const bonusNumber = await InputView.readBonusNumber(winningNumbers);
    
    return { winningNumbers, bonusNumber };
  }

  // 3. 당첨 통계 및 수익률 계산 및 출력 (LottoCalculator.js 이용)
  #calculateAndPrintResults(winningNumbers, bonusNumber) {
    const stats = LottoCalculator.calculateStatistics(
      this.#lottos,
      winningNumbers,
      bonusNumber
    );
    
    const profitRate = LottoCalculator.calculateProfitRate(stats, this.#purchaseAmount);

    // 결과와 수익률 출력 
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