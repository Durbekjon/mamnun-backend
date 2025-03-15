import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerInit = async (app: INestApplication, appMode: string) => {
  if (appMode === 'development') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('MAMNUN')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
};
