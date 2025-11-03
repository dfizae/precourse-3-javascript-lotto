import { Console } from '@woowacourse/mission-utils';
import { PRIZE_MONEY } from '../constants/Game.js';
import { MESSAGE } from '../constants/Messages.js';

export default {

  printPurchaseCount(count) {
    Console.print(MESSAGE.PURCHASE_COUNT(count));
  },

  printLottos(lottos) {
    lottos.forEach(lotto => {
      Console.print(MESSAGE.PRINT_LOTTO(lotto));
    });
  },

  printResults(stats) {
    Console.print(MESSAGE.WINNING_STATS_HEADER);

    // 일치 개수에 맞는 상금을 Game.js 상수에서 불러오기
    const prize5 = PRIZE_MONEY[5].toLocaleString();
    const prize4 = PRIZE_MONEY[4].toLocaleString();
    const prize3 = PRIZE_MONEY[3].toLocaleString();
    const prize2 = PRIZE_MONEY[2].toLocaleString();
    const prize1 = PRIZE_MONEY[1].toLocaleString();
    
    // 포맷팅된 데이터를 템플릿에 주입하여 출력 
    Console.print(MESSAGE.STATS_LINE('3개 일치', prize5, stats[5]));
    Console.print(MESSAGE.STATS_LINE('4개 일치', prize4, stats[4]));
    Console.print(MESSAGE.STATS_LINE('5개 일치', prize3, stats[3]));
    Console.print(MESSAGE.STATS_LINE('5개 일치, 보너스 볼 일치', prize2, stats[2]));
    Console.print(MESSAGE.STATS_LINE('6개 일치', prize1, stats[1]));
  },

  printProfitRate(rate) {
    const formattedRate = rate.toFixed(1);
    Console.print(MESSAGE.PRINT_PROFITRATE(formattedRate));
  }
};