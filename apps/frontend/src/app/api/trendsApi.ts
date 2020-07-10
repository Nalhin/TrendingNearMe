import { axios } from '../config/apiConfig';
import { CoordinatesDto, TrendResponseDto, TrendHistoryDetailsResponseDto, TrendHistoryResponseDto } from '../Api';

export function fetchGetTrendsByLocation({ lat, lng }: CoordinatesDto) {
  return axios.get<TrendResponseDto[]>('/trends/location', {
    params: {
      lat,
      lng,
    },
  });
}

export function fetchGetTrendsHistory() {
  return axios.get<TrendHistoryResponseDto[]>('/trends/history');
}

export function fetchGetTrendDetailsId(key: string, id: string) {
  return axios.get<TrendHistoryDetailsResponseDto>(`/trends/history/${id}`);
}
