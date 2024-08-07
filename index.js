const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");
const { program } = require("commander");

program
  .version("1.2.1")
  .description("CLI to set up a basic Express project")
  .argument("<project-name>", "name of the project")
  .action((projectName) => {
    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
      console.error(`Project directory ${projectName} already exists.`);
      process.exit(1);
    }

    // Copy template files to the new project directory
    fs.mkdirSync(projectPath);
    const templatePath = path.join(__dirname, "template");
    fs.copySync(templatePath, projectPath);

    // Update the project name in package.json
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = fs.readJsonSync(packageJsonPath);
    packageJson.name = projectName;
    packageJson.main = "app.js";

    // To update dependencies, we could use npm commands like `npm outdated` or similar
    // but since we're not installing, we'll skip the install step.
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

    // Log a message with the next steps
    console.log(`Basic Express project setup complete in ${projectName}`);
    console.log(`To get started, run: \n\ncd ${projectName}\n`);
    console.log(`To install dependencies, run:\n\nnpm install\n`);
    console.log(
      `To update dependencies to the latest versions, run:\n\nnpm update\n`
    );
  });

program.parse(process.argv);
