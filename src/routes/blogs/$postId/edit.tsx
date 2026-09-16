import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

async function getPost(postId: string): Promise<Post> {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${postId}`,
	);
	if (!response.ok) {
		throw new Error(`Failed to load post: ${response.status}`);
	}
	return response.json();
}

async function updatePost(post: Post): Promise<Post> {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${post.id}`,
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(post),
		},
	);
	if (!response.ok) {
		throw new Error(`Failed to update post: ${response.status}`);
	}
	return response.json();
}

export const Route = createFileRoute("/blogs/$postId/edit")({
	component: EditBlogPage,
	loader: ({ params }) => getPost(params.postId),
	pendingComponent: () => <p>Loading post…</p>,
});

function EditBlogPage() {
	const post = Route.useLoaderData();
	const navigate = useNavigate();

	const [title, setTitle] = useState(post.title);
	const [body, setBody] = useState(post.body);
	const [saving, setSaving] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);
		try {
			await updatePost({ ...post, title, body });
			navigate({ to: "/blogs" });
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="page-wrap px-4 py-12">
			<section className="island-shell rounded-2xl p-6 sm:p-8">
				<p className="island-kicker mb-2">Edit Post</p>
				<h1 className="display-title mb-6 text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl">
					Post #{post.id}
				</h1>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<label className="flex flex-col gap-1 text-sm text-[var(--sea-ink)]">
						Title
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="rounded-lg border border-[rgba(23,58,64,0.2)] px-3 py-1.5"
						/>
					</label>

					<label className="flex flex-col gap-1 text-sm text-[var(--sea-ink)]">
						Body
						<textarea
							value={body}
							onChange={(e) => setBody(e.target.value)}
							rows={6}
							className="rounded-lg border border-[rgba(23,58,64,0.2)] px-3 py-1.5"
						/>
					</label>

					<div className="flex gap-3">
						<button
							type="submit"
							disabled={saving}
							className="rounded-lg border border-[rgba(23,58,64,0.2)] px-3 py-1.5 font-medium enabled:hover:bg-[rgba(23,58,64,0.06)] disabled:cursor-not-allowed disabled:opacity-40"
						>
							{saving ? "Saving…" : "Save"}
						</button>
						<button
							type="button"
							onClick={() => navigate({ to: "/blogs" })}
							className="rounded-lg border border-[rgba(23,58,64,0.2)] px-3 py-1.5 font-medium hover:bg-[rgba(23,58,64,0.06)]"
						>
							Cancel
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}
