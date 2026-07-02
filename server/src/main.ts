import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 3000;
  
  // Serve static frontend
  const publicDir = findPublicDir();
  if (publicDir) {
    app.useStaticAssets(publicDir);
    
    // SPA catch-all: API routes pass through, everything else gets index.html
    const indexHtml = join(publicDir, 'index.html');
    if (fs.existsSync(indexHtml)) {
      app.use((req: any, res: any, next: any) => {
        if (req.path.startsWith('/api')) {
          next();
        } else {
          res.sendFile(indexHtml);
        }
      });
    }
    console.log(`利尼尔CRM frontend served from: ${publicDir}`);
  }
  
  await app.listen(port);
  console.log(`利尼尔CRM running: http://localhost:${port}`);
}

function findPublicDir(): string | null {
  for (const p of [join(__dirname, '..', 'public'), '/app/public']) {
    if (fs.existsSync(join(p, 'index.html'))) return p;
  }
  return null;
}

bootstrap();
