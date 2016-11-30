# Drawsome-server

1. Have the following directory structure in `/some/absolute/dir`:
```$xslt
/some/absolute/dir
|-games
  |-2016-10-04
  | |-game-cadf8c7d8acf7d8cffad8cf7d.json
  | |-game-cadf8c7d8acf7d8cffad8cf7d.json
  | |-game-cadf8c7d8acf7d8cffad8cf7d.json
  |-2016-11-30
    |-game-cadf8c7d8acf7d8cffad8cf7d.json
    |-game-cadf8c7d8acf7d8cffad8cf7d.json

```
2. ```docker build -t yasa/drawsome-server .```
3. ```docker run -p 3000:3000 -v /some/absolute/dir:/usr/src/app/games -d yasa/drawsome-server```
4. Make `GET` requests to `/games` and `/games/:id`