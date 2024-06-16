FRONTEND_DIR = frontend
BACKEND_DIR = backend

.PHONY: frontend
frontend:
	cd $(FRONTEND_DIR) && npm start

.PHONY: backend
backend:
	cd $(BACKEND_DIR) && python manage.py runserver

# Target to run both frontend and backend in parallel
.PHONY: run
run:
	cd $(FRONTEND_DIR) && npm start &
	cd $(BACKEND_DIR) && python manage.py runserver
