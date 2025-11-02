import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { ERROR } from "../src/constants/Error.js";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const runException = async (input) => {
  // given
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
  const INPUT_NUMBERS_TO_END = ["1000", "1,2,3,4,5,6", "7"];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([input, ...INPUT_NUMBERS_TO_END]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
};

describe("로또 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("기능 테스트", async () => {
    // given
    const logSpy = getLogSpy();

    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ]);
    mockQuestions(["8000", "1,2,3,4,5,6", "7"]);

    // when
    const app = new App();
    await app.run();

    // then
    const logs = [
      "8개를 구매했습니다.",
      "[8, 21, 23, 41, 42, 43]",
      "[3, 5, 11, 16, 32, 38]",
      "[7, 11, 16, 35, 36, 44]",
      "[1, 8, 11, 31, 41, 42]",
      "[13, 14, 16, 38, 42, 45]",
      "[7, 11, 30, 40, 42, 43]",
      "[2, 13, 22, 32, 38, 45]",
      "[1, 3, 5, 14, 22, 45]",
      "3개 일치 (5,000원) - 1개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 62.5%입니다.",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("예외 테스트", async () => {
    await runException("1000j");
  });
});

describe('입력 예외 테스트', () => {
    
    // 1. 위에 있는 예외 테스트 확장 (구매 금액 관련)
    test.each([
      ['구매 금액이 1000 단위가 아닐 때', '1500'],
      ['구매 금액이 숫자가 아닐 때', '1000j'],
      ['구매 금액이 10개 초과일 때', '11000'],
      ['구매 금액이 0원일 때', '0'],
    ])('예외 테스트: %s', async (name, input) => {
      await runException(input);
    });

    // 2. 입력한 당첨 번호 예외 테스트
    test.each([
      ['6개가 아닐 때 (부족)', '1,2,3', ERROR.INVALID_WINNING_NUMBER_COUNT],
      ['6개가 아닐 때 (초과)', '1,2,3,4,5,6,7', ERROR.INVALID_WINNING_NUMBER_COUNT],
      ['숫자가 아닐 때', '1,2,3,4,5,a', ERROR.INVALID_WINNING_NUMBER],
      ['범위를 벗어날 때 (0)', '0,1,2,3,4,5', ERROR.INVALID_WINNING_NUMBER], // 'Lotto.js'가 아닌 'Validation.js'의 에러 확인
      ['범위를 벗어날 때 (46)', '1,2,3,4,5,46', ERROR.INVALID_WINNING_NUMBER], // 'Lotto.js'가 아닌 'Validation.js'의 에러 확인
      ['자체 중복일 때', '1,2,3,4,5,5', ERROR.WINNING_NUMBER_DUPLICATED],
    ])('예외 테스트: 당첨 번호가 %s', async (name, failedInput, expectedError) => {
      // given
      const logSpy = getLogSpy();
      mockRandoms([[1, 2, 3, 4, 5, 6]]);
      mockQuestions([
        '1000',          // 1. 구매 (성공)₩
        failedInput,     // 2. 당첨 (실패)
        '1,2,3,4,5,6',   // 3. 당첨 (재시도-성공)
        '7',             // 4. 보너스 (성공)
      ]);

      // when
      const app = new App();
      await app.run();

      // then
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expectedError));
    });

    // 3. 보너스 번호 예외 테스트
    test.each([
      ['숫자가 아닐 때', 'a', ERROR.INVALID_BONUS_NUMBER],
      ['범위를 벗어날 때 (0)', '0', ERROR.INVALID_BONUS_NUMBER],
      ['범위를 벗어날 때 (46)', '46', ERROR.INVALID_BONUS_NUMBER],
      ['당첨 번호와 중복될 때', '6', ERROR.BONUS_NUMBER_DUPLICATED],
    ])('예외 테스트: 보너스 번호가 %s', async (name, failedInput, expectedError) => {
      // given
      const logSpy = getLogSpy();
      mockRandoms([[1, 2, 3, 4, 5, 6]]);
      mockQuestions([
        '1000',          // 1. 구매 (성공)
        '1,2,3,4,5,6',   // 2. 당첨 (성공)
        failedInput,     // 3. 보너스 (실패)
        '7',             // 4. 보너스 (재시도-성공)
      ]);

      // when
      const app = new App();
      await app.run();

      // then
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expectedError));
    });
  });