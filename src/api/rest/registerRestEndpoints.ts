import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf";
import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import type express from "express";
import KeycloakAdminClient from "keycloak-admin";
import KeycloakConnect from "keycloak-connect";
import { Connection } from "typeorm";

import { Repositories } from "../../database/repositories";
import { getDataLoaders } from "../../dataloaders";
import { RequestContext } from "../RequestContext";
import { endpointsMap } from "./endpoints";

type RegisterRestEndpointsOptions = {
	ormConnection: Connection;
	repositories: Repositories;
	keycloakAdminClientRef: { current: KeycloakAdminClient };
	keycloakConnect: KeycloakConnect.Keycloak;
	expressApp: express.Application;
};

export const registerRestEndpoints = (options: RegisterRestEndpointsOptions) => {
	const { ormConnection, repositories, keycloakAdminClientRef, keycloakConnect, expressApp } = options;

	const context: ContextFunction<ExpressContext, RequestContext> = async ({ req, res }) => {
		return {
			ormConnection,
			req,
			res,
			dataLoaders: getDataLoaders(repositories, ormConnection),
			repositories,
			keycloakAdminClientRef,
			keycloakConnect: keycloakConnect,
		};
	};

	dangerousKeysOf(endpointsMap).forEach((endpointUrl) => {
		const endpoint = endpointsMap[endpointUrl];

		expressApp[endpoint.httpMethod](`/rest/${endpointUrl}`, async (req, res) => {
			return endpoint.handler(await context({ req, res }));
		});
	});
};
