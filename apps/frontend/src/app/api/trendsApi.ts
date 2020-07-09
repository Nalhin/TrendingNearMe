import { axios } from '../config/apiConfig';
import { CoordinatesDto, TrendResponseDto, TrendsHistoryDetailsResponseDto, TrendsHistoryResponseDto } from '../Api';

export function fetchGetTrendsByLocation({ lat, lng }: CoordinatesDto) {
  return axios.get<TrendResponseDto[]>('/trends/location', {
    params: {
      lat,
      lng,
    },
  });
}

export function fetchGetTrendsHistory() {
  return axios.get<TrendsHistoryResponseDto[]>('/trends/history');
}

export function fetchGetTrendDetailsId(key: string, id: string) {
  return axios.get<TrendsHistoryDetailsResponseDto>(`/trends/history/${id}`);
}
