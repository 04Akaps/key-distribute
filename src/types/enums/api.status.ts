export const ApiStatus = {
  SUCCESS: 0, // 성공한 경우
  FAILED: -1, // 에러가 발생한 경우
  INVALID_PARAMETER: -46, // 잘못된 값
} as const;

export type ApiStatus = typeof ApiStatus[keyof typeof ApiStatus];
