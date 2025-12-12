# Mew Monitor
Website designed for use by cat shelters and cat owners to manage and monitor feline health and nutrition/diet. It is aimed to assist tracking cats dietary needs, health conditions, and feeding logs, enabling owners/users to make informed decisions about meal planning, and health management.

# How to run code locally:
## Prerequisites:
1. Node.js version 24 LTS must be installed (https://nodejs.org/en/download)
2. AWS RDS for MySQL database must be created (https://aws.amazon.com/rds/mysql/) (see document for guide on how to set up configuration)
3. ".env" file with AWS database credentials needs to be added to the root of "api" folder (see ".env.example" for template, make sure to just name ".env")
## Start Backend
1. Open the "api" folder in a terminal
2. On first start, run: "npm install"
3. Run: "node index.js"
## Start Frontend
1. Open the "client" folder in another terminal
2. On first start, run: "npm install"
3. Run: "npm run dev"
4. Visit the website in the url shown in terminal. May look like "http://localhost:5173/" for example
