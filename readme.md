# Fastify Sequelize Plugin

```typescript
import { fastifySequelize } from 'fastify-sequelize-plugin';

const fastifySequelizeOptions: FastifySequelizeOptions<HttpServer, RawRequest, RawResponse> = {
  sequelize: {
    dialect: 'postgres',
    logging: false,
    host: process.env.POSTGRES_HOST,
    port: Number.parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    models: [],
  },
};

const fastifySequelizePlugin = fp<
  HttpServer,
  HttpRequest,
  HttpResponse,
  FastifySequelizeOptions<HttpServer, HttpRequest, HttpResponse>
>(fastifySequelize);

this.fastify.register(fastifySequelizePlugin, fastifySequelizeOptions);
```
