#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { program } = require("commander");

// Utility function to validate project name
function validateProjectName(name) {
  if (!name) {
    throw new Error("Project name is required");
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    throw new Error(
      "Project name can only contain letters, numbers, dashes and underscores"
    );
  }
  return true;
}

program
  .version("1.8.0")
  .description("CLI to set up a basic Express project")
  .argument("<project-name>", "name of the project")
  .option("--es", "create the project with ES syntax")
  .action(async (projectName, options) => {
    try {
      validateProjectName(projectName);
      const projectPath = path.join(process.cwd(), projectName);

      if (fs.existsSync(projectPath)) {
        console.error(
          `Error: Project directory "${projectName}" already exists.`
        );
        process.exit(1);
      }

      const templateDir = options.es ? "template-es" : "template-commonjs";
      const templatePath = path.join(__dirname, templateDir);

      if (!fs.existsSync(templatePath)) {
        console.error(`Error: Template directory "${templatePath}" not found.`);
        process.exit(1);
      }

      // Create project directory and copy template
      await fs.mkdirp(projectPath);
      await fs.copy(templatePath, projectPath);

      // Update package.json
      const packageJsonPath = path.join(projectPath, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.name = projectName;
        packageJson.version = "1.0.0";
        packageJson.description = "Express.js application";
        packageJson.main = "app.js";

        // Update scripts
        packageJson.scripts = {
          start: "node app.js",
          dev: "nodemon app.js",
          test: 'echo "Error: no test specified" && exit 1',
        };

        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      }

      // Create .env.example file
      const envExamplePath = path.join(projectPath, ".env.example");
      await fs.writeFile(
        envExamplePath,
        "PORT=3000\nJWT_SECRET=your-secret-key\nLOCALHOST=http://localhost:3000\n"
      );

      // Create uploads directory
      const uploadsDir = path.join(projectPath, "uploads");
      await fs.mkdirp(uploadsDir);

      console.log("\nExpress project setup complete! 🚀");
      console.log("\nNext steps:");
      console.log(`1. cd ${projectName}`);
      console.log("2. npm install");
      console.log("3. cp .env.example .env");
      console.log("4. npm run dev\n");
      console.log("Happy coding! 🎉\n");
    } catch (error) {
      console.error(`\nError: ${error.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
