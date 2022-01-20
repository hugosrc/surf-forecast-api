teardown:
	@docker-compose down -v --rmi local
.PHONY: teardown

test:
	@docker-compose up --abort-on-container-exit test
.PHONY: test

start-db:
	@docker-compose up -d mongo
.PHONY: start-db

surfforecast-api:
	@docker-compose up surfforecast-api
.PHONY: surfforecast-api
