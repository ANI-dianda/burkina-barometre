import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('dashboard')
  getDashboard() {
    return this.statsService.getDashboardStats();
  }

  @Get('services/top-rated')
  getTopRatedServices(@Query('limit') limit?: string) {
    return this.statsService.getTopRatedServices(limit ? parseInt(limit) : 10);
  }

  @Get('services/most-reviewed')
  getMostReviewedServices(@Query('limit') limit?: string) {
    return this.statsService.getMostReviewedServices(
      limit ? parseInt(limit) : 10,
    );
  }

  @Get('administrations/performance')
  getAdministrationPerformance() {
    return this.statsService.getAdministrationPerformance();
  }
}
