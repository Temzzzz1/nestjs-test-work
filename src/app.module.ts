import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';


const enviroment = process.env.NODE_ENV || 'development'




@Module({
  imports: [
    UserModule,
    GroupModule,

    ConfigModule.forRoot({
      envFilePath: `.env.${enviroment}`,
      isGlobal: true
    }),
    
    MongooseModule.forRoot(
      process.env.MONGODB_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true 
      }
    ),

    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
