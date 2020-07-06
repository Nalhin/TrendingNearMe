import { axios } from '@/config/api.config';
import {
  TrendResponseDto,
  TrendsHistoryDetailsResponseDto,
  TrendsHistoryResponseDto,
} from '@/Api';

export function fetchGetTrendsByLocation() {
  return axios.get<TrendResponseDto[]>('/trends/location');
}

export function fetchGetTrendsHistory() {
  return axios.get<TrendsHistoryResponseDto[]>('/trends/history');
}

export function fetchGetTrendDetailsId(id: string) {
  return axios.get<TrendsHistoryDetailsResponseDto[]>(`/trends/history/${id}`);
}
