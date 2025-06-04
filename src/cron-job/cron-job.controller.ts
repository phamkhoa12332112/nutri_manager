import { Controller, Get } from '@nestjs/common';
import { CronJobService } from './cron-job.service';

@Controller('cron-job')
export class CronJobController {
  constructor(private cronJobService: CronJobService) {}

  @Get()
  handleCron() {
    this.cronJobService.handleCron();
  }
}
