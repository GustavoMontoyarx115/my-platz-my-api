[GET] http://localhost:3000/

hola mundo

[GET] http://localhost:/3000/users > Retorna los usuarios

[GET] http://localhost:/3000/users/1 > Retorna un usuario en especifico por id 1

[GET] http://localhost:/3000/users/2 > Retorna un usuario en especifico por id 2

[GET] http://localhost:/3000/users/34234asdasd >Retorna un usuario en especifico por id 34234asdasd

[POST] http://localhost:/3000/users > Retorna el usuario creado

[PUT] http://localhost:/3000/users/:id > Retorna el usuario que se actualizo

[DELETE] http://localhost:/3000/users/:id > Retorna el estado de un usuario eliminado

# For production

npm run build
npm run typeorm migration:run
npm run start:prod

# For production in railway
POSTGRES_HOST=postgres.railway.internal
POSTGRES_PORT=5432
POSTGRES_DB= railway
POSTGRES_USER=postgres
POSTGRES_PASSWORD=QpchoPelQTvDkWeWSxsyWKFTtFUggxDB
