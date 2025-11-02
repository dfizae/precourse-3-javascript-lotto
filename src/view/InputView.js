import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/Messages.js';
import { Validation } from '../utils/Validation.js';

export default {

  // 1. 로또 구매 금액 입력
  async readPurchaseAmount() {
    try {
      const input = await Console.readLineAsync(MESSAGE.INPUT_PURCHASE_AMOUNT);
      return Validation.validatePurchaseAmount(input);
    } catch (error) {
      Console.print(error.message);
      return this.readPurchaseAmount();
    }
  },

  // 2. 당첨 번호 입력
  async readWinningNumbers() {
    try {
      const input = await Console.readLineAsync(MESSAGE.INPUT_WINNING_NUMBERS);
      return Validation.validateWinningNumbers(input); 
    } catch (error) {
      Console.print(error.message);
      return this.readWinningNumbers();
    }
  },

  // 3. 보너스 번호 입력
  async readBonusNumber(winningNumbers) {
    try {
      const input = await Console.readLineAsync(MESSAGE.INPUT_BONUS_NUMBERS);
      return Validation.validateBonusNumber(input, winningNumbers);
    } catch (error) {
      Console.print(error.message);
      return this.readBonusNumber(winningNumbers);
    }
  },
};