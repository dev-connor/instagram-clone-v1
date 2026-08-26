import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { AppModule } from '../src/app.module';

// BE 에이전트가 컨트롤러/DTO에 Swagger 데코레이터로 스펙을 잡은 뒤,
// 이 스크립트로 docs/spec/openapi.yaml을 생성해 FE와의 계약으로 고정한다.
async function exportOpenApi() {
  // preview: true 로 부팅하면 모듈/라우트 그래프만 구성되고 프로바이더 인스턴스화와
  // TypeORM DB 연결(onModuleInit)이 일어나지 않는다 → DB 없이 스펙만 추출 가능
  const app = await NestFactory.create(AppModule, {
    logger: false,
    preview: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Instagram Clone API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const outPath = path.resolve(__dirname, '../../docs/spec/openapi.yaml');
  fs.writeFileSync(outPath, yaml.dump(document));
  console.log(`OpenAPI spec exported → ${outPath}`);

  await app.close();
}

exportOpenApi();
