/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://AI-content-generator_owner:wCPp3tuZM1kj@ep-plain-poetry-a1vqyhm5.ap-southeast-1.aws.neon.tech/AI-content-generator?sslmode=require',
    }
  };