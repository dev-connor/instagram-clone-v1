import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { AppModule } from '../src/app.module';

// BE 에이전트가 컨트롤러/DTO에 Swagger 데코레이터로 스펙을 잡은 뒤,
// 이 스크립트로 docs/spec/openapi.yaml을 생성해 FE와의 계약으로 고정한다.
async function exportOpenApi() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('Instagram Clone API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const outPath = path.resolve(__dirname, '../../docs/spec/openapi.yaml');
  fs.writeFileSync(outPath, yaml.dump(document));
  console.log(`OpenAPI spec exported → ${outPath}`);

  await app.close();
}

exportOpenApi();
