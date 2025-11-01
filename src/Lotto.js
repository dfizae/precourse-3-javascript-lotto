// src/models/Lotto.js
import { ERROR } from './constants/Error.js';
import { RANK } from './constants/Game.js';

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

  calculateRank(winningNumbers, bonusNumber) {
    const matchCount = this.#numbers
      .filter(num => winningNumbers.includes(num))
      .length;
    
    const hasBonus = this.#numbers.includes(bonusNumber);

    if (matchCount === 6) return RANK.FIRST;
    if (matchCount === 5 && hasBonus) return RANK.SECOND;
    if (matchCount === 5) return RANK.THIRD;
    if (matchCount === 4) return RANK.FOURTH;
    if (matchCount === 3) return RANK.FIFTH;

    return RANK.NONE;
  }
}

export default Lotto;
