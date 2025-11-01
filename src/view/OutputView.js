import { Console } from '@woowacourse/mission-utils';
import { PRIZE_MONEY } from '../constants/Game.js';

export default {
  printPurchaseCount(count) {
    Console.print(`\n${count}개를 구매했습니다.`);
  },

  printLottos(lottos) {
    lottos.forEach(lotto => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
  },

  printResults(stats) {
    Console.print('\n당첨 통계\n---');
    Console.print(`3개 일치 (${PRIZE_MONEY[5].toLocaleString()}원) - ${stats[5]}개`);
    Console.print(`4개 일치 (${PRIZE_MONEY[4].toLocaleString()}원) - ${stats[4]}개`);
    Console.print(`5개 일치 (${PRIZE_MONEY[3].toLocaleString()}원) - ${stats[3]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (${PRIZE_MONEY[2].toLocaleString()}원) - ${stats[2]}개`);
    Console.print(`6개 일치 (${PRIZE_MONEY[1].toLocaleString()}원) - ${stats[1]}개`);
  },

  printProfitRate(rate) {
    Console.print(`총 수익률은 ${rate.toFixed(1)}%입니다.`);
  }
};