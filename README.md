# unstorage: Workers Cache Driver

An `unstorage` driver which uses Cloudflare Workers' [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) as its underlying storage.
The Cache API is completedly free when you are on Cloudflare Workers.

## Install

`npm install unstorage-driver-workers-cache`

## Usage

```ts
import { workersCacheDriver } from "unstorage-driver-workers-cache";

const storage = createStorage({
	driver: workersCacheDriver({}),
});

// put
await storage.setItem("key", "value");

// get
const value = await storage.getItem("key");
```