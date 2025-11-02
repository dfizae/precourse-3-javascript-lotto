import { ERROR } from "../constants/Error.js";
import { RANK } from "../constants/Game.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    this.#validateLength(numbers);
    this.#validateDuplicates(numbers);
    this.#validateRangeAndType(numbers);
  }

  // 1. 로또 번호 개수를 검증합니다.
  #validateLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR.INVALID_NUMBER_COUNT);
    }
  }

  // 2. 로또 번호 중복을 검증합니다.
  #validateDuplicates(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR.NUMBER_DUPLICATED);
    }
  }

  // 3. 모든 번호의 타입과 범위를 검증합니다. (1 ~ 45 사이의 정수들인지 검증)
  #validateRangeAndType(numbers) {
    if (numbers.some(num => !Number.isInteger(num) || num < 1 || num > 45)) {
      throw new Error(ERROR.INVALID_NUMBER);
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  // 4. 로또 번호와 당첨 번호, 보너스 번호 일치 여부 검증
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
