import { useEffect, useState } from "react";

function App() {
	const [users, setUsers] = useState([]);
	const [content, setContent] = useState("");

	useEffect(() => {
		fetch("/api/users")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setUsers(data);
			});
	}, []);

	const onSendClick = (e) => {
		e.preventDefault();
		fetch("/api/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "token123",
			},
			body: JSON.stringify({ content }),
		});
	};

	return (
		<div>
			{users.map((user) => (
				<div key={user.id}>{user.name}</div>
			))}

			<div>
				<input
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
				/>
				<button onClick={onSendClick}>Send</button>
			</div>
		</div>
	);
}

export default App;
