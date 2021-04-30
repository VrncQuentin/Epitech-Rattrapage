import {GithubWidget, SpaceXWidget, WeatherWidget } from '@prisma/client';
import db from '../../serverDatabase';

export async function createWeatherWidget(userId: string, widget: any): Promise<WeatherWidget> {
	return await db.weatherWidget.create({
		data: widget
	})
}
export async function createGithubWidget(userId: string, widget: any): Promise<GithubWidget> {
	return await db.githubWidget.create({
		data: widget
	})
}

export async function createSpaceXWidget(userId: string, widget: any): Promise<SpaceXWidget> {
	return await db.spaceXWidget.create({
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

export async function deleteGithubWidget(id: string): Promise<GithubWidget> {
	return await db.githubWidget.delete({
		where: {
			id: id
		}
	})
}

export async function deleteSpaceXWidget(id: string): Promise<SpaceXWidget> {
	return await db.spaceXWidget.delete({
		where: {
			id: id
		}
	})
}