import Lotto from "../src/Lotto";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // TODO: 추가 기능 구현에 따른 테스트 코드 작성
  test("로또 번호에 1 미만의 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([0, 1, 2, 3, 4, 5]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호에 45 초과의 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow("[ERROR]");
  });

  // 정상적인 출력 시
  test("정상적인 로또 번호는 예외를 발생시키지 않는다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6]);
    }).not.toThrow();
  });

  // Lotto.js의 calculateRank 메서드 기능 테스트
  describe("등수 계산(calculateRank) 테스트", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  // [내 로또 번호, 예상되는 등수]
  test.each([
    [[1, 2, 3, 4, 5, 6], 1], // 1등
    [[1, 2, 3, 4, 5, 7], 2], // 2등
    [[1, 2, 3, 4, 5, 8], 3], // 3등
    [[1, 2, 3, 4, 8, 9], 4], // 4등
    [[1, 2, 3, 8, 9, 10], 5], // 5등
    [[10, 11, 12, 13, 14, 15], 0], // 꽝
  ])("로또 번호 %p는 %p등입니다.", (myNumbers, expectedRank) => {
    const lotto = new Lotto(myNumbers);
    // RANK 상수를 임포트해서 비교
    expect(lotto.calculateRank(winningNumbers, bonusNumber)).toBe(expectedRank);
  });
});
});
