import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/Messages.js';
import { ERROR } from '../constants/Error.js';

class InputView {
    async inputPurchase(){
        const purchase = Number(await Console.readLineAsync(MESSAGE.INPUT_LOTTO_PRICES));
        if(Number.isNaN(purchase) || (purchase % 1000) !== 0 ){
            throw new Error(ERROR.INVALID_LOTTO_PRICES); 
        }
        return purchase;
    }
}

export default InputView;
