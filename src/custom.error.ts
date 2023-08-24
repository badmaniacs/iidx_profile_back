import { BadRequestException } from '@nestjs/common';

export enum ErrorCode {
  UNAUTHORIZED = 10000,
  FORBIDDEN = 10001,
  EXPIRED_TOKEN = 10002,
  INTERNAL_SERVER_ERROR = 50000,
  DUPLICATE_USERNAME = 20000,
  DUPLICATE_EMAIL = 20001,
  DUPLICATE_USERNAME_AND_EMAIL = 20002,
}

export class ErrorDto {
  message: string;

  constructor(errorCode: ErrorCode) {
    this.message = `${errorCode} ${ErrorMessageV1[errorCode]}`;
  }
}

export class ErrorException extends BadRequestException {
  errorCode: ErrorCode;

  constructor(errorCode: ErrorCode) {
    super(new ErrorDto(errorCode).message);
    this.errorCode = errorCode;
  }
}

const ErrorMessageV1: Record<ErrorCode, string> = {
  [ErrorCode.UNAUTHORIZED]: 'Unauthorized',
  [ErrorCode.FORBIDDEN]: 'Forbidden',
  [ErrorCode.EXPIRED_TOKEN]: 'Expired Token',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [ErrorCode.DUPLICATE_USERNAME]: 'Duplicate Username',
  [ErrorCode.DUPLICATE_EMAIL]: 'Duplicate Email',
  [ErrorCode.DUPLICATE_USERNAME_AND_EMAIL]: 'Duplicate Username and Email',
};
