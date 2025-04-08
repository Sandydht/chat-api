import { registerAs } from "@nestjs/config";

export default registerAs('DATABASE', () => ({
  MONGO_URI: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST_1}:${process.env.MONGO_PORT},${process.env.MONGO_HOST_2}:${process.env.MONGO_PORT},${process.env.MONGO_HOST_3}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?ssl=true&replicaSet=atlas-1z9oli-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`
}))
