export const ERROR = Object.freeze({
    INVALID_PURCHASE_AMOUNT: "[ERROR] 로또 금액을 숫자로 입력하고, 1000원 단위로 입력해야한다.",
    INVALID_PURCHASE_AMOUNT_COUNT: "[ERROR] 로또 구매 가능 수량은 한 회당 10개 이하만 허용됩니다.",
    INVALID_NUMBER: "[ERROR] 로또 번호는 특수문자, 문자 외의 1과 45사이의 정수만 허용됩니다.",
    INVALID_NUMBER_COUNT: "[ERROR] 로또 번호의 개수가 6개여야 한다.",
    INVALID_WINNING_NUMBER: "[ERROR] 당첨 번호는 특수문자, 문자 외의 1과 45사이의 정수를 입력해야 한다.",
    INVALID_WINNING_NUMBER_COUNT: "[ERROR] 당첨 번호는 6개의 숫자로 이루어져야 한다.",
    INVALID_BONUS_NUMBER: "[ERROR] 보너스 번호는 특수문자, 문자 외의 1과 45사이의 정수를 입력해야 한다.",
    INVALID_BONUS_NUMBER_COUNT: "[ERROR] 보너스 번호는 1개의 숫자만 입력한다.",
    NUMBER_DUPLICATED: "[ERROR] 로또 번호에 중복된 숫자가 있으면 안된다.",
    WINNING_NUMBER_DUPLICATED: "[ERROR] 당첨 번호들은 서로 같으면 안된다.",
    BONUS_NUMBER_DUPLICATED: "[ERROR] 당첨 번호와 보너스 번호는 같으면 안된다."
});