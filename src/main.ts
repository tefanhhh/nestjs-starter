import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/* eslint-disable @typescript-eslint/no-var-requires */
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    app.setGlobalPrefix('api');
    app.enableCors();
    const config = new DocumentBuilder()
      .setTitle('Nest JS Starter API')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('NEST_JS_API')
      .addSecurity('bearer', {
        type: 'http',
        scheme: 'bearer',
      })
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);
    await app.listen(3000);
  }
}
bootstrap();
