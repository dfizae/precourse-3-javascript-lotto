import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/Messages.js';
import { ERROR } from '../constants/Error.js';

export default class InputView {
    static async readPurchaseAmount(){
        const amount = Number(await Console.readLineAsync(MESSAGE.INPUT_LOTTO_PRICES));
        if(Number.isNaN(amount) || (amount % 1000) !== 0 ){
            throw new Error(ERROR.INVALID_LOTTO_PRICES); 
        }
        return amount;
    }
}

