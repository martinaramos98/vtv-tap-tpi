import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './scoring/models/scoring.model';
import { ScoreController } from './scoring/controllers/scoring.controller';
import { ScoreService } from './scoring/services/scoring.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
