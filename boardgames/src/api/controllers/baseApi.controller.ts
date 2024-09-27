import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { Result } from 'src/application/Core/result';

@Controller()
export abstract class BaseApiController {
  
  protected HandleResult<T>(result: Result<T>): T | void {
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (result.isSuccess && result.value !== null) {
      return result.value;
    }

    if (result.isSuccess && result.value === null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
  }
}