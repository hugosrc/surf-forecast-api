import { StormGlass, ForecastPoint } from '@src/clients/stormGlass';
import { InternalError } from '@src/utils/errors/internal-error';
import { Beach } from '@src/models/beach';
import logger from '@src/logger';
import { Rating } from './rating';

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}

export interface TimeForecast {
  time: string;
  forecast: BeachForecast[];
}

export class ForecastProcessingInternalError extends InternalError {
  constructor(message: string) {
    super(`Unexpected error during the forecast processing: ${message}`);
  }
}

export class Forecast {
  constructor(
    protected stormGlass = new StormGlass(),
    protected RatingService: typeof Rating = Rating
  ) {}

  public async processForecastForBeaches(
    beaches: Beach[]
  ): Promise<TimeForecast[]> {
    const pointsWithCorrentSources: BeachForecast[] = [];
    logger.info(`Preparing the forecast for ${beaches.length} beaches`);

    try {
      for (const beach of beaches) {
        const rating = new this.RatingService();

        const points = await this.stormGlass.fetchPoints(beach.lat, beach.lng);

        const enrichedBeachData = this.enrichedBeachData(points, beach, rating);

        pointsWithCorrentSources.push(...enrichedBeachData);
      }

      return this.mapForecastByTime(pointsWithCorrentSources);
    } catch (err) {
      logger.error(err);
      throw new ForecastProcessingInternalError(err.message);
    }
  }

  private enrichedBeachData(
    points: ForecastPoint[],
    beach: Beach,
    rating: Rating
  ): BeachForecast[] {
    return points.map((point) => ({
      ...{},
      ...{
        lat: beach.lat,
        lng: beach.lng,
        name: beach.name,
        position: beach.position,
        rating: rating.getRateForPoint(point),
      },
      ...point,
    }));
  }

  private mapForecastByTime(forecast: BeachForecast[]): TimeForecast[] {
    const forecastByTime: TimeForecast[] = [];

    for (const point of forecast) {
      const timePoint = forecastByTime.find(
        (forecast) => forecast.time === point.time
      );

      if (timePoint) {
        timePoint.forecast.push(point);
      } else {
        forecastByTime.push({
          time: point.time,
          forecast: [point],
        });
      }
    }

    return forecastByTime;
  }
}
