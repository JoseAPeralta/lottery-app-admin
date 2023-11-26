export interface LotteryDraw {
  id?: string;
  draw_date: Date | string;
  folio: number;
  letters: string;
  prizes: {
    first: string;
    second: string;
    third: string;
  };
  serie: number;
  draw_number: number;
  type: string;
}
