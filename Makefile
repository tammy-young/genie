# Target to run the frontend in local development mode
.PHONY: local
local:
	npm run start

# Target to build frontend
.PHONY: build
build:
	npm run build

# Target to install dependencies
.PHONY: install
install:
	npm i
