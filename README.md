# 🎱 로또

## 📌 프로젝트 기능
간딴한 로또 발매기를 구현한다.

## 📌 주요 기능

### 1. 로또 구매
-   1,000원 단위로 로또를 구매할 수 있습니다. (1회 최대 10개로 제한)
-   구매 금액에 해당하는 만큼의 로또가 자동 발급됩니다.
-   각 로또는 1~45 사이의 중복되지 않는 6개 숫자로 구성됩니다.

### 2. 당첨 번호 및 보너스 번호 입력
-   사용자가 당첨 번호 6개와 보너스 번호 1개를 입력합니다.

### 3. 당첨 통계 및 수익률 계산
-   구매한 로또와 당첨 번호를 비교하여 당첨 내역(1등 ~ 5등)을 집계합니다.
-   총 구매 금액 대비 당첨 금액을 계산하여 수익률을 소수점 둘째 자리에서 반올림하여 출력합니다.

### 4. 예외 처리
-   사용자의 모든 잘못된 입력(금액 단위, 숫자 범위, 중복, 타입 오류 등)에 대해 `[ERROR]` 메시지를 출력합니다.
-   에러 발생 시 프로그램이 종료되지 않고, **해당 입력 단계부터 다시 시작**합니다.

<br>

---

## 📂 프로젝트 구조

프로젝트는 관심사의 분리 (Separation of Concerns) 원칙에 따라 구성되었습니다. <br>
각 모듈은 하나의 책임만 수행하도록 설계했습니다.

```
precourse-3-javascript-Lotto/
│
├── tests/ (테스트 코드들 관리)
│   └── ApplicationTest.js : 메인 테스트
│   └── LottoTest.js : Lotto.js 단위 테스트
├── node_modules/
│   └── ...
├──src/ 
│   ├── 📂 constants/ 
│   │   ├── Error.js (에러 메시지 관리)
│   │   ├── Game.js : 게임 규칙 메시지 (랭크, 상금) 관리
│   │   └── Messages.js (입출력 메시지 관리)
│   │ 
│   ├── 📂 view/ (입출력 담당) 
│   │   ├── InputView.js 
│   │   └── OutputView.js 
│   │ 
│   ├── 📂 utils/ (사용자의 입력값 검증) 
│   │   └── Validation.js 
│   │ 
│   ├── 📂 models/ (자동으로 배정되는 로또의 규칙) 
│   │   └── Lotto.js 
│   │ 
│   ├── 📂 services/ (당첨 계산, 수익률 로직) 
│   │   └── LottoCalculator.js 
│   │ 
│   ├── 📂 controllers/ (전체 게임 흐름 관리) 
│   │   └── GameController.js 
│   │ 
│   ├── App.js (프로그램 진입점, Controller 실행)
│   │ 
│   └── index.js
├── .gitignore
├── .npmrc 
├── package-lock.json
├── package.json
└── README.md 
```

<br>

## 💡 핵심 구현 전략

주어진 요구사항을 만족시키기 위해 다음과 같은 전략을 사용했습니다.

### 1. Indent 2 / 함수 15라인 제한 준수
`while` 대신 try...catch + 재귀 호출로 재입력 로직을 간결하게 구현했습니다.

### 2. `Validation.js` vs `Lotto.js` : 검증 로직의 분리
|구분|임무|예시|
|:---|:---|:---|
|`utils/Validation.js`|사용자 입력값 검증 (문자열 → 숫자 배열 변환)|'1,2,a', ' 1, 2' 등 입력 처리|
|`models/Lotto.js`|로또 규칙 검증 (1~45 범위, 중복, 개수)|
Random.pickUniqueNumbersInRange() 결과 검증|

### 3. MVC 패턴을 응용한 흐름 제어와 Service 분리 시도
MVC 기반 구조로 역할을 명확히 나누었습니다.
서비스 레이어(`LottoCalculator`)를 추가해 비즈니스 로직을 분리했습니다.

- **Model**: `Lotto.js` — 데이터와 규칙 정의

- **View**: `InputView.js`, `OutputView.js` — 콘솔 입출력

- **Controller**: `GameController.js` — 전체 게임 흐름 제어

- **Service**: `LottoCalculator.js` — 등수 계산, 수익률 연산

Util: `Validation.js` — 입력값 정제

### 4. 상수화를 통한 매직 넘버 및 문자열 제거 (하드 코딩 방지)

공통 피드백에서 하드 코딩을 지양하라는 피드백을 받고 저번주에 부족했던 부분을 보완했습니다.

-   **매직 넘버 제거**: `constants/Game.js`에 `PRIZE_MONEY`나 `RANK` 같은 숫자들을 상수로 분리하여 코드의 가독성과 유지보수성을 높였습니다.
-   **문자열 상수화**: `constants/Messages.js`에 모든 입출력 UI 문자열을 상수화했습니다.
-   **동적 메시지 처리**: `PURCHASE_COUNT: (count) => \`\n${count}개를 구매했습니다.\``와 같이 동적인 출력이 필요한 메시지는 **'함수형 상수'**로 구현했습니다.
-   이를 통해 `OutputView.js` 같은 뷰 파일이 '한글' 문자열에 직접 의존하지 않고, `MESSAGE.PURCHASE_COUNT(5)`와 같이 데이터를 주입하여 호출하는 방식으로 설계했습니다.