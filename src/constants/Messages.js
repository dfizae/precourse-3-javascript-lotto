export const MESSAGE = Object.freeze({
    // 입력 메시지 상수
    INPUT_PURCHASE_AMOUNT: "구입금액을 입력해 주세요.\n",
    INPUT_WINNING_NUMBERS: "당첨 번호를 입력해 주세요.\n",
    INPUT_BONUS_NUMBERS: "보너스 번호를 입력해 주세요.\n",

    // 출력 메시지 상수
    PURCHASE_COUNT: (count) => `\n${count}개를 구매했습니다.`,
    PRINT_LOTTO: (lotto) => `[${lotto.getNumbers().join(', ')}]`,
    WINNING_STATS_HEADER: '\n당첨 통계\n---',

    /**
     * @param {*} match : n개 일치 
     * @param {*} prize : 일치 개수에 따른 상금
     * @param {*} count : 당첨 개수
     */

    STATS_LINE: (match, prize, count) => `${match} (${prize}원) - ${count}개`,
    PRINT_PROFITRATE: (rate) => `총 수익률은 ${rate}%입니다.`
});