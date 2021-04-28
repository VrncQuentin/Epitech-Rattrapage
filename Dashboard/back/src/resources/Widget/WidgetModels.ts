import { WeatherWidget } from '@prisma/client';
import db from '../../serverDatabase';

export async function createWeatherWidget(userId: string, widget: any): Promise<WeatherWidget> {
	return await db.weatherWidget.create({
		data: widget
	})
}

export async function deleteWeatherWidget(id: string): Promise<WeatherWidget> {
	return await db.weatherWidget.delete({
		where: {
			id: id
		}
	})
}