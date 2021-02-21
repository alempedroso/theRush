db/migrate:
	docker-compose exec app mix ecto.setup

db/import_players:
	docker-compose exec app mix import_rushing_players

tests/backend:
	docker-compose exec app mix test

tests/frontend:
	docker-compose exec app npm run test
