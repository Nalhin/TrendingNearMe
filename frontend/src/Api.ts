/* tslint:disable */
/* eslint-disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginUserDto {
  username: string;
  password: string;
}

export interface UserResponseDto {
  _id: string;
  username: string;
  email: string;
}

export interface AuthUserResponseDto {
  user: UserResponseDto;
  token: string;
}

export interface RegisterUserDto {
  username: string;
  password: string;
  email: string;
}

export interface TrendResponseDto {
  promotedContent: boolean | null;
  tweetVolume: number | null;
  name: string;
  url: string;
  query: string;
}

export interface CoordinatesDto {
  lat: number;
  lng: number;
}

export interface TrendsHistoryResponseDto {
  _id: string;
  coordinates: CoordinatesDto;
  created: string;
}

export interface TrendsHistoryDetailsResponseDto {
  _id: string;
  coordinates: CoordinatesDto;
  created: string;
  trends: TrendResponseDto[];
}
