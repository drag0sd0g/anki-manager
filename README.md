# Simple UI interfacing with the local Anki

## Prerequisites

- You will require a local installation of [Anki](https://apps.ankiweb.net/) and the [AnkiConnect](https://ankiweb.net/shared/info/2055492159) plugin
- To allow HTTP requests from this application, configure AnkiConnect's CORS origin list by going to Tools >> Add-ons >> Select "AnkiConnect" >> Click "Config" >> edit "webCorsOriginList", for example

```json
{
  "apiKey": null,
  "apiLogPath": null,
  "ignoreOriginList": [],
  "webBindAddress": "127.0.0.1",
  "webBindPort": 8765,
  "webCorsOriginList": ["http://localhost:3000"]
}
```

## This project has been built with

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Axios](https://axios-http.com/)
- [AnkiConnect](https://github.com/FooSoft/anki-connect)
