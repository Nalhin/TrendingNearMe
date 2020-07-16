import { render, act, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import { AxiosResponse } from 'axios';

import {
  TrendHistoryDetailsResponseDto,
  TrendHistoryResponseDto,
} from '@trends/data';
import { TrendHistoryDetailsResponseDtoBuilder, trendHistoryResponseDtoBuilder } from '@trends/fixtures';

import * as trendsApi from '../../api/trends.api';
import PersonalHistory from './PersonalHistory';

describe('Personal History Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const trendHistory = trendHistoryResponseDtoBuilder.buildMany(3);

  it('should display history details', async () => {
    jest
      .spyOn(trendsApi, 'fetchGetTrendsHistory')
      .mockResolvedValueOnce({ data: trendHistory } as AxiosResponse<
        TrendHistoryResponseDto[]
      >);

    const { container } = render(<PersonalHistory />);

    await waitFor(() =>
      expect(trendsApi.fetchGetTrendsHistory).toBeCalledTimes(1),
    );
    expect(container.querySelectorAll('.leaflet-marker-icon').length).toBe(3);
  });

  it('should fetch and display data when marker is clicked', async () => {
    const trendDetails = TrendHistoryDetailsResponseDtoBuilder.buildOne();
    jest
      .spyOn(trendsApi, 'fetchGetTrendsHistory')
      .mockResolvedValueOnce({ data: trendHistory } as AxiosResponse<
        TrendHistoryResponseDto[]
      >);
    jest
      .spyOn(trendsApi, 'fetchGetTrendDetailsId')
      .mockResolvedValueOnce({ data: trendDetails } as AxiosResponse<
        TrendHistoryDetailsResponseDto
      >);

    const { container, findByText } = render(<PersonalHistory />);

    const marker = await waitFor(() => {
      const el = container.querySelector('.leaflet-marker-icon');
      if (!el) {
        throw new Error();
      }
      return el;
    });
    act(() => {
      fireEvent.click(marker);
    });

    expect(trendsApi.fetchGetTrendsHistory).toBeCalledTimes(1);
    expect(trendsApi.fetchGetTrendDetailsId).toBeCalledTimes(1);
    expect(await findByText(trendDetails.trends[0].name)).toBeTruthy();
  });
});
