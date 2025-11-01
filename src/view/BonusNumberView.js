// src/view/BonusNumberView.js
import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/Messages.js';
import { ERROR } from '../constants/Error.js';

export default {
  async readBonusNumber() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_BONUS_NUMBERS);
    const number = Number(input.trim());

    if (Number.isNaN(number)) {
      throw new Error(ERROR.INVALID_BONUS_NUMBER);
    }

    return number;
  },
};
