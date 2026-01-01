build:
    docker build -t key-val-store:0.0.1 .

up:
    docker compose up -d

down:
    docker compose down

kill:
    docker compose kill
    docker compose rm --force -v