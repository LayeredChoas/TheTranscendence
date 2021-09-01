docker rm postgresql-container
docker run --name postgresql-container -p 5432:5432 -e POSTGRES_PASSWORD=ayoub -e POSTGRES_USERNAME=ayoub -d postgres
