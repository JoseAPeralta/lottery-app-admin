import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { LotteryList } from './index.ts';

describe('Component LotteryBoard', () => {
  const LotteryListProps = [
    {
      id: '63b3820ce784d28ac9d57c9b',
      drawDate: new Date('2022-12-30T05:00:00Z'),
      folio: 6,
      letters: 'BDDD',
      prizes: {
        first: '2013',
        second: '39',
        third: '39',
      },
      serie: 2,
      type: 'Zodiaco',
    },
    {
      id: '63b381bee784d28ac9d57c9a',
      drawDate: new Date('2022-12-28T05:00:00Z'),
      folio: 6,
      letters: 'BDAA',
      prizes: {
        first: '3189',
        second: '1633',
        third: '5915',
      },
      serie: 20,
      type: 'Intermedio',
    },
    {
      id: '63b38190e784d28ac9d57c99',
      drawDate: new Date('2022-12-24T05:00:00Z'),
      folio: 11,
      letters: 'AABA',
      prizes: {
        first: '6098',
        second: '1339',
        third: '9971',
      },
      serie: 15,
      type: 'Dominical',
    },
    {
      id: '63b380dfe784d28ac9d57c97',
      drawDate: new Date('2022-12-21T05:00:00Z'),
      folio: 5,
      letters: 'DDBA',
      prizes: {
        first: '4637',
        second: '1238',
        third: '5439',
      },
      serie: 8,
      type: 'Intermedio',
    },
    {
      id: '63b38159e784d28ac9d57c98',
      drawDate: new Date('2022-12-18T05:00:00Z'),
      folio: 1,
      letters: 'DCDD',
      prizes: {
        first: '0667',
        second: '6284',
        third: '2642',
      },
      serie: 19,
      type: 'Dominical',
    },
  ];

  it('Should match to snapshot', () => {
    const result = render(<LotteryList lotteryDraws={LotteryListProps} />);
    expect(result).toMatchSnapshot();
  });

  it('Should accesible LotteryBoard', async () => {
    const { container } = render(<LotteryList lotteryDraws={LotteryListProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
