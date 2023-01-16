import { HttpStatus } from "@nestjs/common";

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
  }

abstract class AbstractController {
    successResponse<T>(data: T, message: string = "") {
        return this.apiResponseReturn(data, message, HttpStatus.OK);
    }

    notFounResponse<T>(data: T, message: string = "") {
        return this.apiResponseReturn(data, message, HttpStatus.NOT_FOUND);
    }

    internalErrorResponse<T>(data: T, message: string = "") {
        return this.apiResponseReturn(data, message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private apiResponseReturn<T>(data: T, message: string = "", status: number = HttpStatus.OK): ApiResponse<T> {
        return {
            status,
            message,
            data
        }
    }
}