import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/Messages.js';
import { ERROR } from '../constants/Error.js';

export default {
    async readBonusNumber(winningNumbers){
        const input = await Console.readLineAsync(MESSAGE.INPUT_BONUS_NUMBERS);
        const number = Number(input.trim());
        if (Number.isNaN(number) || number < 1 || number > 45) 
            throw new Error(ERROR.INVALID_BONUS_NUMBER);
        if (winningNumbers.includes(number))
            throw new Error(ERROR.BONUS_NUMBER_DUPLICATED);
        return number;
    }
};