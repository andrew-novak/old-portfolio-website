# Personal Website

My own portfolio website with an API and an admin panel.

### How to start it? (Development Mode)

1. Clone the repo:

```
git clone https://github.com/andrew-novak/personal-website
```

2. Go to the project's root:

```
cd personal-website
```

3. Run the npm script in the project root:

```
npm run install-all
```

to install all the **node modules** for:

- project root
- **api/** subdirectory
- **client/** subdirectory
- **admin/** subdirectory

4. Run the bash script:

```
bash ./scripts/dev-gen-api-env.sh
```

to create a development API's **.env** file with default values.

5. Run the npm script:

```
npm run all
```

### How to deploy it? (Production Mode)

1. Make sure you have a static content server set (eg. Nginx) that would serve images when accessing 
```
https://<url>/images
```
2. Set environment variables, eg.:

```
PERSONAL_WEBSITE_API_ROOT_ROUTE=/api
PERSONAL_WEBSITE_API_PORT=4000
PERSONAL_WEBSITE_IMGS_ACCESS=<whole url to images>
PERSONAL_WEBSITE_IMGS_LOCAL=<whole local path to images>
PERSONAL_WEBSITE_JWT_SECRET=<your own secret>
PERSONAL_WEBSITE_MONGO_URL=<whole url to your mongodb>
```

3. Clone the repo:

```
git clone https://github.com/andrew-novak/personal-website
```

4. Go to the project's root:

```
cd personal-website
```

5. Run the npm script in the project's root:

```
npm run install-all
```

to install all the **node modules** for:

- project root
- **api/** subdirectory
- **client/** subdirectory
- **admin/** subdirectory

6. Run:

```
node ./scripts/setApiUrl.js <api_url>
```
to set an API url for **client/** and **admin/** subprojects

7*. Add **homepage** properties to **client/package.json** and/or **admin/package.json** if they will be accessible through subroutes (eg. **https://example.com/admin**):

```
json -I -f admin/package.json -e "this.homepage=\"<admin url>\""
```
You can just skip this step if they are not accessible through subroutes (eg. **https://exampleadmin.com** or **admin.example.com**).

8. Build **client/** and **admin/** subprojects:

```
npm run build-static
```

9. Rename the newly created **admin/build/** and **client/build/** directories, and move them to desired locations.

10. Rename and move the **api/** directory to desired location.

11. Start the API:
An example using PM2. You are free to use any other method.
```
pm2 start <target location><api root>/server.js --name <api name>
```
Example values:
```
pm2 start ./api/server.js --name personal-website-api
```
