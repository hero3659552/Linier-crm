import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  
  // Serve static frontend in production
  const staticPaths = [
    join(__dirname, '..', '..', 'public'),       // local dev
    join(__dirname, '..', 'public'),              // nest dist
    '/app/public',                                 // docker
  ];
  
  for (const p of staticPaths) {
    if (fs.existsSync(p)) {
      app.useStaticAssets(p);
      // SPA fallback - serve index.html for all non-API routes
      app.use('*', (req: any, res: any) => {
        if (!req.path.startsWith('/api')) {
          res.sendFile(join(p, 'index.html'));
        }
      });
      console.log(`Serving static files from: ${p}`);
      break;
    }
  }
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`利尼尔CRM running on http://localhost:${port}`);
}
bootstrap();
