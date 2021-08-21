import moment from 'moment';

export class TimeUtil {
  public static getUnixTimeForAFutureDay(days: number): number {
    return moment().add(days, 'days').unix();
  }
}
