import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("/api/users", (resolver) => {
		return HttpResponse.json([
			{
				id: 1,
				name: "anson",
			},
		]);
	}),
	http.post("/api/messages", async ({ request }) => {
		const authToken = request.headers.get("Authorization");
		if (!authToken)
			return HttpResponse.json({ msg: "Unauthorized" }, { status: 401 });
		const requestBody = await request.json();
		return HttpResponse.json(
			{
				content: requestBody.content,
				createdAt: new Date().toLocaleString(),
			},
			{ status: 201 }
		);
	}),
];
