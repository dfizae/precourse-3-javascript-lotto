// src/view/InputView.js
import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/Messages.js';
import { ERROR } from '../constants/Error.js';

export default {
  async readPurchaseAmount() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_PURCHASE_AMOUNT);
    const amount = Number(input.trim());

    if (Number.isNaN(amount) || amount % 1000 !== 0 || amount <= 0) {
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT);
    }

    const count = (amount / 1000);
    if(count > 10){
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT_COUNT);
    }
    return amount;
  }
};
