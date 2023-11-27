export interface LotteryDraw {
  id?: string;
  date: Date | string;
  folio: number;
  letters: string;
  prizes: {
    first: string;
    second: string;
    third: string;
  };
  serie: number;
  number: number;
  type: string;
}
