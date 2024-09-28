import UserMigration from "./user.migration.js";

async function runMigrations(action) {
  const userMigration = new UserMigration();

  try {
    if (action === 'up') {
      await userMigration.up();
    } else if (action === 'down') {
      await userMigration.down();
    } else {
      console.error("Invalid action. Please use 'up' or 'down'.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
}

const action = process.argv[2];
runMigrations(action);
