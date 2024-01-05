import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true }
  )
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
