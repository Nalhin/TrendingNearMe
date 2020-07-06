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
  promotedContent: object;
  query: string;
  tweetVolume: object;
}

export interface TrendsHistoryResponseDto {
  _id: string;
  coordinates: object;
  created: string;
}

export interface TrendsHistoryDetailsResponseDto {
  _id: string;
  coordinates: object;
  created: string;
  trends: TrendResponseDto[];
}
