docker exec -it mongodb_test mongo --port 27018 superbTest --eval "db.dropDatabase();"
docker cp restaurantsDump.json mongodb_test:./
docker exec -it mongodb_test mongoimport --port=27018 --collection restaurants --db superbTest --file restaurantsDump.json
docker cp shiftsDump.json mongodb_test:./
docker exec -it mongodb_test mongoimport --port=27018 --collection shifts --db superbTest --file shiftsDump.json
docker cp tablesDump.json mongodb_test:./
docker exec -it mongodb_test mongoimport --port=27018 --collection tables --db superbTest --file tablesDump.json
docker cp reservationsDump.json mongodb_test:./
docker exec -it mongodb_test mongoimport --port=27018 --collection reservations --db superbTest --file reservationsDump.json