import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/Messages.js';
import { ERROR } from '../constants/Error.js';

export default {
    async readWinningNumbers(){
        const input = await Console.readLineAsync(MESSAGE.INPUT_WINNING_NUMBERS);
        const numbers = input.split(',').map(num => Number(num.trim()));
        if (numbers.length !== 6) throw new Error(ERROR.INVALID_WINNING_NUMBER_COUNT);
        if (numbers.some(num => Number.isNaN(num) || num < 1 || num > 45)) 
          throw new Error(ERROR.INVALID_WINNING_NUMBER);
        return numbers.sort((a, b) => a - b);
    }
};