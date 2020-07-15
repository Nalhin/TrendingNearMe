import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import { AxiosResponse } from 'axios';

import { TrendResponseDto } from '@trends/data';
import { trendResponseDtoBuilder } from '@trends/data';

import * as trendsApi from '../../api/trends.api';
import Home from './Home';

describe('Home', () => {
  it('should fetch and display current trends on map click', async () => {
    const reponse = trendResponseDtoBuilder.buildMany(3);
    jest
      .spyOn(trendsApi, 'fetchGetTrendsByLocation')
      .mockResolvedValueOnce({ data: reponse } as AxiosResponse<
        TrendResponseDto[]
      >);

    const { container, findByText } = render(<Home />);

    await act(async () => {
      fireEvent.click(container.querySelector('.leaflet-container'));
    });

    expect(trendsApi.fetchGetTrendsByLocation).toBeCalledTimes(1);
    expect(await findByText(reponse[0].name)).toBeInTheDocument();
  });
});
