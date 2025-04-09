import { defineDriver } from "unstorage";

// to avoid error when running in node
const cache =
	typeof caches !== "undefined" ? await caches.open("unstorage") : undefined;

type CfCacheOptions = {
	base?: string;
	ttl?: number;
};

export const workersCacheDriver = defineDriver((options: CfCacheOptions) => {
	const base = options?.base ?? "https://cache.internal";
	const ttl = options?.ttl ?? 365 * 24 * 60 * 60; // 1 year
	const cacheControl = `public, max-age=${ttl}`;
	const makeUrl = (key: string) => new URL(key, base);

	return {
		name: "cloudflare-workers-cache",
		options,
		async hasItem(key, _opts) {
			const response = cache?.match(makeUrl(key));
			return !!response;
		},
		async getItem(key, _opts) {
			const response = await cache?.match(makeUrl(key));
			if (!response) {
				return undefined;
			}
			return response.text();
		},
		async setItem(key, value, _opts) {
			await cache?.put(
				makeUrl(key),
				new Response(value, {
					headers: {
						"Cache-Control": cacheControl,
					},
				}),
			);
		},
		async removeItem(key, _opts) {
			await cache?.delete(makeUrl(key));
		},
		async getKeys(_opts) {
			throw new Error("Not implemented");
		},
		async clear(_base, _opts) {
			throw new Error("Not implemented");
		},
		async dispose() {
			throw new Error("Not implemented");
		},
		async watch(_callback) {
			throw new Error("Not implemented");
		},
	};
});
