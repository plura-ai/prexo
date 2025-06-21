import { InMemoryHistory } from "../server/memory/in.memory";
import { RedisHistory } from "../server/memory/redis";

export const HistoryClientInit = (): MessageHistoryActions => {
	const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
	const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

	if (redisUrl && redisToken) {
		return new RedisHistory({
			config: {
				url: redisUrl,
				token: redisToken,
			}
		});
	}

	return new InMemoryHistory();
}