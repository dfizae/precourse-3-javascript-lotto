import { PRIZE_MONEY, RANK } from './constants/Game.js';

export const LottoGame = {
  calculateStatistics(lottos, winningNumbers, bonusNumber) {
    const stats = {
      [RANK.FIRST]: 0,
      [RANK.SECOND]: 0,
      [RANK.THIRD]: 0,
      [RANK.FOURTH]: 0,
      [RANK.FIFTH]: 0,
      [RANK.NONE]: 0,
    };

    lottos.forEach(lotto => {
      const rank = lotto.calculateRank(winningNumbers, bonusNumber);
      stats[rank]++;
    });

    return stats;
  },

  calculateProfitRate(stats, purchaseAmount) {
    let totalPrize = 0;

    Object.entries(stats).forEach(([rank, count]) => {
      totalPrize += (PRIZE_MONEY[rank] || 0) * count;
    });

    if (purchaseAmount === 0) return 0;

    const rate = (totalPrize / purchaseAmount) * 100;

    return Math.round(rate * 10) / 10;
  }
};