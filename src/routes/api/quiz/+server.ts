import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { RequestHandler } from './$types';

const VALID_ANSWERS = new Set(['a', 'b', 'c', 'd']);

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { alias, answers } = body;

	// Validate answers: must have exactly 18 entries with keys 1-18 and values a-d
	if (!answers || typeof answers !== 'object') {
		return json({ error: 'Missing answers' }, { status: 400 });
	}

	const keys = Object.keys(answers);
	if (keys.length !== 18) {
		return json({ error: 'All 18 questions must be answered' }, { status: 400 });
	}

	for (let i = 1; i <= 18; i++) {
		const answer = answers[String(i)];
		if (!VALID_ANSWERS.has(answer)) {
			return json({ error: `Invalid answer for question ${i}` }, { status: 400 });
		}
	}

	// Sanitize alias
	const cleanAlias = alias && typeof alias === 'string'
		? alias.trim().slice(0, 50) || null
		: null;

	const { error } = await supabase
		.from('quiz_responses')
		.insert({ alias: cleanAlias, answers });

	if (error) {
		console.error('Supabase insert error:', error);
		return json({ error: 'Failed to save response' }, { status: 500 });
	}

	return json({ success: true });
};
