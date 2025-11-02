# 🎱 로또

## 📌 프로젝트 기능
간딴한 로또 발매기를 구현한다.

## 📌 주요 기능

### 1. 로또 구매
-   1,000원 단위로 로또를 구매할 수 있습니다. (1회 최대 10개)
-   구매 금액에 해당하는 만큼의 로또가 자동 발급됩니다.
-   각 로또는 1~45 사이의 중복되지 않는 6개 숫자로 구성됩니다.

### 2. 당첨 번호 및 보너스 번호 입력
-   사용자가 당첨 번호 6개와 보너스 번호 1개를 입력합니다.

### 3. 당첨 통계 및 수익률 계산
-   구매한 로또와 당첨 번호를 비교하여 당첨 내역(1등~5등)을 집계합니다.
-   총 구매 금액 대비 당첨 금액을 계산하여 수익률을 소수점 둘째 자리에서 반올림하여 출력합니다.

### 4. 견고한 예외 처리
-   사용자의 모든 잘못된 입력(금액 단위, 숫자 범위, 중복, 타입 오류 등)에 대해 `[ERROR]` 메시지를 출력합니다.
-   에러 발생 시 프로그램이 종료되지 않고, **해당 입력 단계부터 다시 시작**합니다.

<br>

---

## 📂 프로젝트 구조

프로젝트의 핵심 목표는 **관심사의 분리(SoC)**였습니다. 
각 파일과 폴더가 단 하나의 책임(SRP)만 갖도록 구조를 설계했습니다.

```
precourse-3-javascript-Lotto/
├── tests/
│   └── ApplicationTest.js : 기존 테스트 코드 관리
│   └── LottoTest.js : Lotto.js 파일 테스트 코드 관리
├── node_modules/
│   └── ...
├──src/ 
│   ├── 📂 constants/ (상수: 에러 메시지, 게임 규칙) 
│   │   ├── Error.js (에러 메시지)
│   │   ├── Game.js : 게임 규칙 메시지 (랭크, 지급 금액)
│   │   └── Messages.js (입력 메시지)
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
│   ├── 📂 services/ (등수, 수익률 계산) 
│   │   └── LottoCalculator.js 
│   │ 
│   ├── 📂 controllers/ (전체 게임 진행) 
│   │   └── GameController.js 
│   │ 
│   ├── App.js (시작점))
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
-   `indent depth 3`을 피하기 위해 `while`문 대신 `try...catch`와 **재귀 호출**을 사용해 `InputView`의 재입력 로직을 구현했습니다.
-   `Lotto.js`의 `#validate` 메서드처럼 15라인이 넘어갈 가능성이 있는 함수는, `#validateLength`, `#validateDuplicates` 등 작은 비공개 메서드로 분리하여 단일 책임과 15라인 제한을 동시에 만족시켰습니다.

### 2. `Validation.js` vs `Lotto.js` : 검증 로직의 분리
'유효성 검사'라는 동일한 목적이라도, 그 책임에 따라 두 개의 파일로 명확하게 분리했습니다.

* **`utils/Validation.js` (1차 검문소)**
    * **책임**: 사용자의 **"날것의 문자열(string) 입력"**을 검증합니다.
    * **임무**: `'1,2,a'`, `' 1, 2'` 같은 지저분한 입력을 `number[]`로 안전하게 변환하는 역할에만 집중합니다.

* **`models/Lotto.js` (2차 검문소)**
    * **책임**: `Lotto` 객체의 **"핵심 비즈니스 규칙(Domain Rule)"**을 수호합니다.
    * **임무**: `Validation.js`를 통과한 데이터든, `Random`으로 생성된 데이터든, "6개인가?", "중복은 없는가?", "범위는 1-45인가?" 등 로또의 핵심 규칙을 최종적으로 방어합니다.

### 3. MVC 패턴을 응용한 흐름 제어
-   **Model**: `Lotto.js` (핵심 데이터와 규칙)
-   **View**: `InputView.js`, `OutputView.js` (I/O만 담당)
-   **Controller**: `GameController.js` (View와 Model/Service를 중재하며 게임 흐름 제어)

여기에 `LottoCalculator.js`(Service)와 `Validation.js`(Util)를 추가로 분리하여 각 컴포넌트의 책임을 더욱 명확하게 했습니다.