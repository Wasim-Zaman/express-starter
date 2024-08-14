const fs = require("fs-extra");
const path = require("path");
const { program } = require("commander");

program
  .version("1.4.2")
  .description("CLI to set up a basic Express project")
  .argument("<project-name>", "name of the project")
  .option("--es", "create the project with ES syntax")
  .action((projectName, options) => {
    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
      console.error(`Project directory "${projectName}" already exists.`);
      process.exit(1);
    }

    // Determine which template to use based on the flag
    const templateDir = options.es ? "template-es" : "template-commonjs";
    const templatePath = path.join(__dirname, templateDir);

    if (!fs.existsSync(templatePath)) {
      console.error(`Template directory "${templatePath}" does not exist.`);
      process.exit(1);
    }

    try {
      // Copy template files to the new project directory
      fs.mkdirSync(projectPath);
      fs.copySync(templatePath, projectPath);

      // Update the project name in package.json
      const packageJsonPath = path.join(projectPath, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = fs.readJsonSync(packageJsonPath);
        packageJson.name = projectName;
        packageJson.main = options.es ? "index.mjs" : "app.js";
        fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
      } else {
        console.warn(`Warning: package.json not found in template.`);
      }

      // Log a message with the next steps
      console.log(
        `Basic Express project setup complete in "${projectName}" using ${
          options.es ? "ES syntax" : "CommonJS syntax"
        }`
      );
      console.log(`To get started, run: \n\ncd ${projectName}\n`);
      console.log(`To install dependencies, run:\n\nnpm install\n`);
      console.log(
        `To update dependencies to the latest versions, run:\n\nnpm update\n`
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
