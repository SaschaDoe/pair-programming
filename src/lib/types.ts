export type AnswerChoice = 'a' | 'b' | 'c' | 'd';

export interface QuizQuestion {
	id: number;
	text: string;
	section: 'general' | 'pairing';
	options: {
		key: AnswerChoice;
		text: string;
	}[];
}

export interface QuizAnswers {
	[questionId: string]: AnswerChoice;
}

export interface QuizResponse {
	id: string;
	alias: string | null;
	answers: QuizAnswers;
	created_at: string;
}
