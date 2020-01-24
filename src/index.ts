import { FastifyInstance, RegisterOptions } from 'fastify';
import * as http from 'http';
import * as http2 from 'http2';
import * as https from 'https';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

export type HttpServer = http.Server | https.Server | http2.Http2Server | http2.Http2SecureServer;
export type HttpRequest = http.IncomingMessage | http2.Http2ServerRequest;
export type HttpResponse = http.ServerResponse | http2.Http2ServerResponse;

export interface FastifySequelizeOptions<
  HttpServer = http.Server,
  HttpRequest = http.IncomingMessage,
  HttpResponse = http.ServerResponse
> extends RegisterOptions<HttpServer, HttpRequest, HttpResponse> {
  sequelize: SequelizeOptions;
}

export async function fastifySequelize<
  HttpServer = http.Server,
  HttpRequest = http.IncomingMessage,
  HttpResponse = http.ServerResponse
>(
  fastify: FastifyInstance<HttpServer, HttpRequest, HttpResponse>,
  options: FastifySequelizeOptions<HttpServer, HttpRequest, HttpResponse>
): Promise<void> {
  const sequelize = new Sequelize(options.sequelize);
  await sequelize.authenticate();
  fastify.decorate('sequelize', sequelize);
  fastify.addHook('onClose', (fastifyInstance, done) => {
    sequelize
      .close()
      .then(done)
      .catch(done);
  });
}
