import {getSchema, printSchema} from "./src/prisma/schema";

const fs = require('fs');
const path = require('path');

// Read package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get Prisma schema path
const prismaSchemaPath = packageJson.prisma && packageJson.prisma.schema
    ? packageJson.prisma.schema
    : 'src/prisma/schema.prisma';

fs.readFile(prismaSchemaPath, 'utf8', (_err: NodeJS.ErrnoException | null, data: string) => {
    console.log(getSchema(data));
})


console.log(`Prisma schema path: ${prismaSchemaPath}`);