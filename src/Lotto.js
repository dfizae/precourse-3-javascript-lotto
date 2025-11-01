// src/models/Lotto.js
import { ERROR } from './constants/Error.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR.INVALID_WINNING_NUMBER_COUNT);
    }

    const hasDuplicates = new Set(numbers).size !== numbers.length;
    if (hasDuplicates) {
      throw new Error(ERROR.DUPLICATED_NUMBER);
    }

    const outOfRange = numbers.some(num => num < 1 || num > 45);
    if (outOfRange) {
      throw new Error(ERROR.INVALID_WINNING_NUMBER);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
