import axios from 'axios';
import { StormGlass } from '@src/clients/stormGlass';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json'
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json'
import Axios from 'axios';

jest.mock('axios');

describe('StormGlass client', () => {
  const mockedAxios = axios as jest.Mocked<typeof Axios>

  it('should return the normalized forecast front he StormGlass service', async () => {
    const lat = -33.792726;
    const lng = 151.289824;

    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather3HoursFixture });

    const stormGlass = new StormGlass(mockedAxios);

    const response = await stormGlass.fetchPoints(lat, lng);

    expect(response).toEqual(stormGlassNormalized3HoursFixture);
  });
});
