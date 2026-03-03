import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { rating, feedback_text } = body;

	// Validate rating: must be integer 1-5
	if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
		return json({ error: 'Rating must be an integer between 1 and 5' }, { status: 400 });
	}

	// Validate feedback_text: optional string, max 2000 chars
	let cleanText: string | null = null;
	if (feedback_text != null) {
		if (typeof feedback_text !== 'string') {
			return json({ error: 'Feedback text must be a string' }, { status: 400 });
		}
		const trimmed = feedback_text.trim();
		if (trimmed.length > 2000) {
			return json({ error: 'Feedback text must be 2000 characters or less' }, { status: 400 });
		}
		cleanText = trimmed || null;
	}

	const { error } = await supabase
		.from('talk_feedback')
		.insert({ rating, feedback_text: cleanText });

	if (error) {
		console.error('Supabase insert error:', error);
		return json({ error: 'Failed to save feedback' }, { status: 500 });
	}

	return json({ success: true });
};
