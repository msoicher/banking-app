import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class UpApiService {
  private readonly client: AxiosInstance;

  constructor(private config: ConfigService) {
    this.client = axios.create({
      baseURL: this.config.get<string>('UP_API_BASE_URL'),
      headers: {
        Authorization: `Bearer ${this.config.get<string>('UP_API_KEY')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    try {
      const response = await this.client.get<T>(path, { params });
      return response.data;
    } catch (error: any) {
      const status = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.response?.data?.errors?.[0]?.detail ?? error.message;
      throw new HttpException(message, status);
    }
  }
}
