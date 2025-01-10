import { Seeder } from "@jorgebodega/typeorm-seeding";
import { User } from "./../models";
import { DataSource } from "typeorm";

export default class UserSeeder extends Seeder {
  /**
   * RUN THE SEENDER FOR USER CREATING
   * @param dataSource
   */
  async run(dataSource: DataSource): Promise<void> {
    const user = new User();
    user.firstname = "John";
    user.lastname = "Doe";
    user.email = "john.doe@example.com";
    user.password = "password123";
    await dataSource.createEntityManager().save(user);
  }
}
