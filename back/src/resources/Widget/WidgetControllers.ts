import {GithubWidget, SpaceXWidget, WeatherWidget } from '@prisma/client';

import * as models from './WidgetModels';

export async function createWeatherWidget(userId: string, widget: string): Promise<WeatherWidget> {
	return models.createWeatherWidget(userId, widget);
}

export async function deleteWeatherWidget(id: string): Promise<WeatherWidget> {
	return models.deleteWeatherWidget(id);
}

export async function  updateWeatherWidget(id: string, widget: string): Promise<WeatherWidget> {
	return models.updateWeatherWidget(id, widget)
}

export async function createGithubWidget(userId: string, widget: string): Promise<GithubWidget> {
	return models.createGithubWidget(userId, widget);
}

export async function  updateGithubWidget(id: string, widget: string): Promise<GithubWidget> {
	return models.updateGithubWidget(id, widget)
}

export async function deleteGithubWidget(id: string): Promise<GithubWidget> {
	return models.deleteGithubWidget(id);
}

export async function createSpaceXWidget(userId: string, widget: string): Promise<SpaceXWidget> {
	return models.createSpaceXWidget(userId, widget);
}

export async function  updateSpaceXWidget(id: string, widget: string): Promise<SpaceXWidget> {
	return models.updateSpaceXWidget(id, widget)
}

export async function deleteSpaceXWidget(id: string): Promise<SpaceXWidget> {
	return models.deleteSpaceXWidget(id);
}
