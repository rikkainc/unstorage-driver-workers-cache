# unstorage: Workers Cache Driver

## Install

`npm install unstorage-driver-workers-cache`

## Usage

https://developers.cloudflare.com/workers/runtime-apis/cache/

```ts
const storage = createStorage({
	driver: workersCacheDriver({}),
});

// put
await storage.setItem("key", "value");

// get
const value = await storage.getItem("key");
```