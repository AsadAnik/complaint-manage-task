import { config } from "dotenv";
import { DataSource } from 'typeorm';
import { User, Ticket } from '../../db/models';

// Load environment variables from .env file
config();

class AppDataSourceHandler {
    private static instance: DataSource;

    /**
     * GET INSTANCE
     * @returns
     */
    public static getInstance(): DataSource {
        if (!AppDataSourceHandler.instance) {
            AppDataSourceHandler.instance = new DataSource({
                type: 'mysql',
                host: String(process.env.DB_HOST ?? 'localhost'),
                port: Number(process.env.DB_PORT ?? 3306),
                username: String(process.env.DB_USER ?? 'root'),
                password: String(process.env.DB_PASSWORD ?? 'test'),
                database: String(process.env.DB_NAME ?? 'test'),
                entities: [User, Ticket],
                migrations: ['./src/db/migrations/*.ts'],
                synchronize: true, // Made false to migrations work
                logging: true, // Enable logging for debugging
            });
        }
        return AppDataSourceHandler.instance;
    }

    /**
     * INITIALIZE
     */
    public static async initialize(): Promise<void> {
        try {
            const dataSource = AppDataSourceHandler.getInstance();
            await dataSource.initialize();
            console.log('DataSource initialized successfully!');

        } catch (error) {
            console.error('Error during DataSource initialization: ', error);
        }
    }
}

// Initialize the DataSource, Basically for migration runs..
export const dataSource = AppDataSourceHandler.getInstance();

// Export the DataSource instance
export default AppDataSourceHandler;
