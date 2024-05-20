import { describe, expect, it } from "vitest"
import { loadArticles } from "./article"

describe("The articles get loaded by the api", () => {
	it("loads only pictures with pictures", async () => {
		const fiveArts = await loadArticles(5);

		expect(fiveArts.length).toBe(5)
		expect(fiveArts.every(({ picture }) => picture)).toBe(true)
	})
})
