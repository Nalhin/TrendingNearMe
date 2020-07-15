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
  name: string;
  url: string;
  promotedContent: boolean | null;
  query: string;
  tweetVolume: number | null;
}

export interface CoordinatesDto {
  lat: number;
  lng: number;
}

export interface TrendHistoryResponseDto {
  coordinates: CoordinatesDto;
  _id: string;
  created: string;
}

export interface TrendHistoryDetailsResponseDto {
  coordinates: CoordinatesDto;
  trends: TrendResponseDto[];
  _id: string;
  created: string;
}
