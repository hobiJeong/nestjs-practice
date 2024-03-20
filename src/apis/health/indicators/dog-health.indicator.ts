import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

export interface Dog {
  name: string;
  type: string;
}

@Injectable()
export class DogHealthIndicator extends HealthIndicator {
  private dogs: Dog[] = [
    { name: 'Fido', type: 'good-boy' },
    { name: 'Rex', type: 'bad-boy' },
  ];

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const badBoys = this.dogs.filter((dog) => dog.type === 'bad-boy');
    const isHealthy = badBoys.length === 0;
    const result = this.getStatus(key, isHealthy, { badBoys: badBoys.length });

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('DogCheck failed', result);
  }
}
