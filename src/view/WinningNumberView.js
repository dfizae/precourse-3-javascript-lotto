// src/view/WinningNumberView.js
import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/Messages.js';
import { ERROR } from '../constants/Error.js';

export default {
  async readWinningNumbers() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_WINNING_NUMBERS);
    const numbers = input.split(',').map(num => num.trim()).filter(num => num !== '').map(Number);

    if (numbers.some(num => Number.isNaN(num))) {
      throw new Error(ERROR.INVALID_WINNING_NUMBER);
    }

    return numbers;
  }
};
