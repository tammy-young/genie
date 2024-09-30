FRONTEND_DIR = frontend
BACKEND_DIR = backend

# Target to run frontend
.PHONY: frontend
frontend:
	cd $(FRONTEND_DIR) && npm start

# Target to run backend
.PHONY: backend
backend:
	cd $(BACKEND_DIR) && netlify dev

# Target to run both frontend and backend in parallel
.PHONY: run
run:
	cd $(FRONTEND_DIR) && npm start &
	cd $(BACKEND_DIR) && netlify dev

# Target to build frontend
.PHONY: build
build:
	cd $(FRONTEND_DIR) && npm run build

# Target to install dependencies
.PHONY: install
install:
	cd $(FRONTEND_DIR) && npm i
	cd $(BACKEND_DIR) && npm i
