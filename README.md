# Some Stuff...

## Guide used for dockerising react:
`https://rsbh.dev/blogs/dockerize-react-app`

### Starting the production server on `:3000`:
```
docker build -t rat-tv-live .
docker images
docker run --restart=always -p 3000:80 rat-tv-live
```

### Start the dev server (with hot reload) `:3001`:
```
docker-compose up
```