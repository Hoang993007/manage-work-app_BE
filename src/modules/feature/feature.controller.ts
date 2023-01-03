import { BadRequestException, Body, Controller, Post, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { parse } from 'csv-parse'

@Controller('feature')
export class FeatureController {
  @Post('/import-csv')
  @ApiOperation({ summary: 'Import csv file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        csvFile: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('airdropCsvFile'))
  async importAirdropCsv(
    @UploadedFile() csvFile: Express.Multer.File,
    @Response({ passthrough: true }) res: any
  ) {
    if (!csvFile) throw new BadRequestException('CSV file is needed')

    const records: any = [];
    const parser = parse({
      delimiter: ','
    });

    parser.on('readable', function () {
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });

    parser.on('end', function () {
      this.airdropsService.importCsv(records);
    }.bind(this));

    parser.on('error', function (err) {
      console.error(err.message);
    });

    parser.write(csvFile.buffer);
    parser.end();

    res.json('ok')
  }
}