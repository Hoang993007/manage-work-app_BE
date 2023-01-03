import { Injectable } from '@nestjs/common';

@Injectable()
export class FeatureService {
  async importCsv(records: any) {
    console.log(records)
  }
}
