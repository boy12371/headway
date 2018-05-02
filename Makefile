build:
	npm run build

run:
	npm start

install:
	npm install

dev:
	./node_modules/.bin/ts-node src/server/server.ts &
	npm run dev

server:
	./node_modules/.bin/ts-node src/server/server.ts

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
