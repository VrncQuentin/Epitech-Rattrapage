import {GithubWidget, SpaceXWidget, WeatherWidget } from '@prisma/client';

import * as models from './WidgetModels';

export async function createWeatherWidget(userId: string, widget: string): Promise<WeatherWidget> {
	return models.createWeatherWidget(userId, widget);
}

export async function deleteWeatherWidget(id: string): Promise<WeatherWidget> {
	return models.deleteWeatherWidget(id);
}

export async function createGithubWidget(userId: string, widget: string): Promise<GithubWidget> {
	return models.createGithubWidget(userId, widget);
}

export async function deleteGithubWidget(id: string): Promise<GithubWidget> {
	return models.deleteGithubWidget(id);
}

export async function createSpaceXWidget(userId: string, widget: string): Promise<SpaceXWidget> {
	return models.createSpaceXWidget(userId, widget);
}

export async function deleteSpaceXWidget(id: string): Promise<SpaceXWidget> {
	return models.deleteSpaceXWidget(id);
}
