import { ERROR } from '../constants/Error.js';

export const Validation = {
  validatePurchaseAmount(input) {
    const amount = Number(input.trim());
    if (Number.isNaN(amount) || amount % 1000 !== 0 || amount <= 0) {
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT);
    }
    if ((amount / 1000) > 10) {
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT_COUNT);
    }
    return amount;
  },

  validateWinningNumbers(input) {
    const numbers = input.split(',').map(num => num.trim()).filter(num => num !== '').map(Number);
    if (numbers.some(num => Number.isNaN(num) || !Number.isInteger(num) || num < 1 || num > 45)) {
      throw new Error(ERROR.INVALID_WINNING_NUMBER);
    }
    if (numbers.length !== 6) {
      throw new Error(ERROR.INVALID_WINNING_NUMBER_COUNT);
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR.WINNING_NUMBER_DUPLICATED);
    }
    return numbers;
  },
  
  validateBonusNumber(input, winningNumbers) {
    const number = Number(input.trim());
    if (Number.isNaN(number) || !Number.isInteger(number) || number < 1 || number > 45) {
      throw new Error(ERROR.INVALID_BONUS_NUMBER);
    }
    if (winningNumbers.includes(number)) {
      throw new Error(ERROR.BONUS_NUMBER_DUPLICATED);
    }
    return number;
  }
};