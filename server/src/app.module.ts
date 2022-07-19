import {Module} from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { TrackModule } from "./track/track.module";
import * as path from 'path'
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static'),
    TrackModule, 
    FileModule, 
    }),
  ]
})
export class AppModule {

}