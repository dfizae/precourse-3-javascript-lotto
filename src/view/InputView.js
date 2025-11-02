import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/Messages.js';
import { ERROR } from '../constants/Error.js';

export default {
  
  // 1. 로또 구매 금액 입력
  async readPurchaseAmount() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_PURCHASE_AMOUNT);
    const amount = Number(input.trim());

    if (Number.isNaN(amount) || amount % 1000 !== 0 || amount <= 0) {
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT);
    }

    if((amount / 1000) > 10){
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT_COUNT);
    }
    return amount;
  },

  // 2. 당첨 번호 입력
  async readWinningNumbers() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_WINNING_NUMBERS);
    const numbers = input.split(',').map(num => num.trim()).filter(num => num !== '').map(Number);

    if (numbers.some(num => Number.isNaN(num) || !Number.isInteger(num))) {
      throw new Error(ERROR.INVALID_WINNING_NUMBER);
    }

    if(numbers.length !== 6) {
      throw new Error(ERROR.INVALID_WINNING_NUMBER_COUNT);
    }

    return numbers;
  },

  // 3. 보너스 번호 입력
  async readBonusNumber() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_BONUS_NUMBERS);
    const number = Number(input.trim());

    if (Number.isNaN(number || !Number.isInteger(number) || number < 1 || number > 45)) {
      throw new Error(ERROR.INVALID_BONUS_NUMBER);
    }

    return number;
  },


};
