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

to create development **.env** and **images/**.

3. Run the npm script in the project root:

```
npm run install-all
```

to install all the **node modules** for:

- project root
- api
- client
- admin

4. Run the bash script:

```
bash ./scripts/dev-gen-api-env.sh
```

5. Run the npm script:

```
npm run all
```

### How to deploy it? (Production Mode)

1. Clone the repo:

```
git clone https://github.com/andrew-novak/personal-website
```
2. Go to the project's repo:

```
cd personal-website
```
3. Run the npm script in the project root:

```
npm run install-all
```

to install all the **node modules** for:

- project root
- api
- client
- admin

4. Run:

```
node ./scripts/setApiUrl.js <api_url>
```
to set the API url in client and admin

5. Add the homepage property to "admin/package.json":

```
json -I -f admin/package.json -e "this.homepage=\"<admin url>\""
```
6. Build client and admin websites:

```
npm run build-static
```

7. Rename and move api/ directory to a proper location:

8. Start API, eg.:

```
pm2 start <api root>/server.js --name <api name>
```
9. Move .............
