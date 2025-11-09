import { Score } from '../models/scoring.model';

export type ScoresCreateDTO = Omit<Score, 'id' | 'createdAt'>;
