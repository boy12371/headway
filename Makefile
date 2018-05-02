build:
	npm run build

run:
	npm start

install:
	npm install

db:
	# ./node_modules/.bin/ts-node src/server/reset-database.ts --config
	node src/server/reset-database.js


dev:
	./node_modules/.bin/nodemon &
	# npm run dev

server:
	# ./node_modules/.bin/nodemon src/server/server.ts
	node src/server/server.js

lint:
	npm run lint

test:
	npm test

deploy:
	git push heroku master

# usage make component name=widget
component:
	mkdir -p src/components/$(name)
	touch src/components/$(name)/$(name).html
	touch src/components/$(name)/$(name).scss
	cp src/components/base.ts src/components/$(name)/$(name).ts
	echo "export * from './$(name)'" > src/components/$(name)/index.ts

.PHONY: dev test
