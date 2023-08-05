import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorModel {
  @ApiProperty({
    enum: [HttpStatus.INTERNAL_SERVER_ERROR],
  })
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR;

  @ApiProperty({
    type: 'string',
  })
  message: string;
}

export class BadRequestErrorModel {
  @ApiProperty({
    enum: [HttpStatus.BAD_REQUEST],
  })
  statusCode: HttpStatus.BAD_REQUEST;

  @ApiProperty({
    type: ['string'],
  })
  message: Array<string>;
}

export class UnauthorizedErrorModel {
  @ApiProperty({
    enum: [HttpStatus.UNAUTHORIZED],
  })
  statusCode: HttpStatus.UNAUTHORIZED;

  @ApiProperty({
    type: 'string',
  })
  message: string;
}

export class ForbiddenErrorModel {
  @ApiProperty({
    enum: [HttpStatus.FORBIDDEN],
  })
  statusCode: HttpStatus.FORBIDDEN;

  @ApiProperty({
    type: 'string',
  })
  message: string;
}

export class NotFoundErrorModel {
  @ApiProperty({
    enum: [HttpStatus.NOT_FOUND],
  })
  statusCode: HttpStatus.NOT_FOUND;

  @ApiProperty({
    type: 'string',
  })
  message: string;
}
