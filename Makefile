install:
	npm ci

publish:  
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npm run test:coverage