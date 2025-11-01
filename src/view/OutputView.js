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
};