interface LotteryDraw {
  id: string;
  drawDate: Date;
  folio: number;
  letters: string;
  prizes: {
    first: string;
    second: string;
    third: string;
  };
  serie: number;
  ticketDate?: Date;
  type: string;
}

export type LotteryDraws = Array<LotteryDraw>;

interface myprops {
  lotteryDraws: LotteryDraws;
}

const LotteryList = (props: myprops) => {
  const lotteryDraws = props.lotteryDraws;

  return (
    <>
      <h1>Hi!</h1>
      <section>
        {lotteryDraws.map((draw, index) => (
          <section key={index}>
            <div>{draw.type}</div>
            <div>{new Date(draw.drawDate).getDate()}</div>
            <div>{draw.prizes.first}</div>
            <div>{draw.prizes.second}</div>
            <div>{draw.prizes.third}</div>
            <div>{draw.letters}</div>
            <div>{draw.serie}</div>
            <div>{draw.folio}</div>
          </section>
        ))}
      </section>
      u
    </>
  );
};

export default LotteryList;
