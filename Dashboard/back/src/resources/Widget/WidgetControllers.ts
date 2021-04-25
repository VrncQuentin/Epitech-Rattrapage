import { WeatherWidget } from '@prisma/client';

import * as models from './WidgetModels';

export async function createWeatherWidget(userId: string, widget: string): Promise<WeatherWidget> {
	return models.createWeatherWidget(userId, widget);
}
