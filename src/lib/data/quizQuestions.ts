import type { QuizQuestion } from '$lib/types';

export const quizQuestions: QuizQuestion[] = [
	{
		id: 1,
		text: "You're stuck on a problem for 20 minutes. A colleague sits right next to you. What do you actually do?",
		section: 'general',
		options: [
			{ key: 'a', text: "I ask them immediately — that's what teammates are for." },
			{ key: 'b', text: 'I quietly google for another 30 minutes, hoping to solve it before they notice.' },
			{ key: 'c', text: 'I pretend to work on something else until I figure it out alone.' },
			{ key: 'd', text: 'I feel a knot in my stomach. Asking would mean admitting I don\'t know something I "should" know.' }
		]
	},
	{
		id: 2,
		text: 'Be honest: when was the last time you said "I have no idea how this works" out loud at work?',
		section: 'general',
		options: [
			{ key: 'a', text: "Today or this week — I say it all the time, it's no big deal." },
			{ key: 'b', text: 'I can\'t remember. I usually phrase it more carefully, like "I\'d need to look into that."' },
			{ key: 'c', text: "I avoid situations where I'd have to say it." },
			{ key: 'd', text: 'The thought of saying that in front of my team makes my chest tight.' }
		]
	},
	{
		id: 3,
		text: 'A teammate writes code you think is wrong. What happens inside you?',
		section: 'general',
		options: [
			{ key: 'a', text: "I point it out directly — we're both here to build something good." },
			{ key: 'b', text: 'I hint at it carefully, maybe ask a "question" that leads them to the issue.' },
			{ key: 'c', text: "I stay silent. I might be wrong, and I don't want to seem arrogant." },
			{ key: 'd', text: 'I say nothing — what if they get defensive, and then our relationship is damaged?' }
		]
	},
	{
		id: 4,
		text: 'Someone watches you type code in real time. How does your body react?',
		section: 'general',
		options: [
			{ key: 'a', text: "I don't notice a difference. Code is code." },
			{ key: 'b', text: "My typing gets slightly slower. I double-check things I'd normally just write." },
			{ key: 'c', text: "My hands feel heavier. I start second-guessing syntax I've written a thousand times." },
			{ key: 'd', text: 'I feel exposed — like my thought process itself is being judged, not just the code.' }
		]
	},
	{
		id: 5,
		text: "You're in a meeting. Someone presents a technical concept you don't understand. Everyone else nods. What do you do?",
		section: 'general',
		options: [
			{ key: 'a', text: "I raise my hand and ask them to explain. If I don't get it, others probably don't either." },
			{ key: 'b', text: 'I stay quiet and google it afterwards.' },
			{ key: 'c', text: "I nod along. I'll figure it out later. Asking would slow everyone down." },
			{ key: 'd', text: "I feel a wave of shame. I wonder if I'm the only one who doesn't belong here." }
		]
	},
	{
		id: 6,
		text: 'Think about the last time you made a mistake in code that others saw. How long did that feeling stay with you?',
		section: 'general',
		options: [
			{ key: 'a', text: 'A few seconds — mistakes happen, we fixed it, we moved on.' },
			{ key: 'b', text: 'It lingered for the rest of the day. I replayed the moment.' },
			{ key: 'c', text: 'Days. I kept thinking about what they must think of me now.' },
			{ key: 'd', text: 'I still think about it sometimes.' }
		]
	},
	{
		id: 7,
		text: "Could you openly say to a colleague: \"I'm mass-deleting this code I just spent an hour on — it's the wrong approach\"?",
		section: 'general',
		options: [
			{ key: 'a', text: 'Yes — killing your darlings is part of the craft.' },
			{ key: 'b', text: "I'd do it, but I'd feel the need to explain why it wasn't wasted time." },
			{ key: 'c', text: "I'd quietly refactor it instead of deleting, so the hour doesn't feel lost." },
			{ key: 'd', text: "I'd keep the bad code longer than I should, because throwing it away feels like proof I'm not good enough." }
		]
	},
	{
		id: 8,
		text: 'How do you feel about silence while working next to someone?',
		section: 'general',
		options: [
			{ key: 'a', text: 'Comfortable — silence means focus.' },
			{ key: 'b', text: 'Slightly awkward — I feel like I should be communicating or producing something.' },
			{ key: 'c', text: 'Anxious — are they silently judging what I\'m doing?' },
			{ key: 'd', text: 'I avoid shared working situations partly because of this.' }
		]
	},
	{
		id: 9,
		text: 'A junior developer finds a bug in your code. What is your very first, unfiltered emotional reaction — before your rational brain kicks in?',
		section: 'general',
		options: [
			{ key: 'a', text: 'Gratitude — good catch.' },
			{ key: 'b', text: 'A tiny sting, but I appreciate it.' },
			{ key: 'c', text: 'Defensiveness — I want to explain why the bug exists.' },
			{ key: 'd', text: 'Embarrassment — if a junior found it, how bad must I be?' }
		]
	},
	{
		id: 10,
		text: 'Close your eyes for a second. Imagine the most psychologically safe team you can think of. What does it feel like?',
		section: 'general',
		options: [
			{ key: 'a', text: 'Like home. I can be slow, confused, wrong — and still belong.' },
			{ key: 'b', text: "Like a place I've almost experienced but not quite." },
			{ key: 'c', text: "Like something other people have but I haven't found yet." },
			{ key: 'd', text: "Like something I'm not sure actually exists." }
		]
	},
	{
		id: 11,
		text: 'Be brutally honest: is there someone on your team or in your organisation you would absolutely not want to pair program with?',
		section: 'pairing',
		options: [
			{ key: 'a', text: "No — I'd pair with anyone. Different people, different things to learn." },
			{ key: 'b', text: 'Maybe one or two people, but I could handle it professionally.' },
			{ key: 'c', text: 'Yes — and I know exactly who. The thought alone makes me uncomfortable.' },
			{ key: 'd', text: "There are people where I'd seriously consider calling in sick to avoid it." }
		]
	},
	{
		id: 12,
		text: 'Why? What is it about that person that makes you feel that way? (Pick the one closest to your truth.)',
		section: 'pairing',
		options: [
			{ key: 'a', text: "They're so much better than me — I'd feel like I'm slowing them down with every keystroke." },
			{ key: 'b', text: "They'd take over. My ideas wouldn't matter, and I'd just end up watching." },
			{ key: 'c', text: "They'd judge me. Every hesitation, every wrong variable name — they'd notice and remember." },
			{ key: 'd', text: "We just don't click. The energy would be draining, and I wouldn't be able to think clearly." }
		]
	},
	{
		id: 13,
		text: 'Your team lead says: "Starting Monday, you\'ll pair program for the entire sprint — every day, all day." What\'s the first thing you feel?',
		section: 'pairing',
		options: [
			{ key: 'a', text: 'Curious — could be interesting to try.' },
			{ key: 'b', text: 'Nervous — that\'s a lot of "being on" without any place to hide.' },
			{ key: 'c', text: 'Resistance — I need space to think, to struggle, to be messy before I show my work.' },
			{ key: 'd', text: "Dread — like someone just told me I'll be taking an exam for two weeks straight, in public." }
		]
	},
	{
		id: 14,
		text: "You're pairing. You have an idea for the solution, but you're only 60% sure it's right. Do you say it?",
		section: 'pairing',
		options: [
			{ key: 'a', text: 'Yes — half-formed ideas are how good solutions start.' },
			{ key: 'b', text: 'I\'d frame it very carefully: "This might be completely wrong, but..."' },
			{ key: 'c', text: "I'd wait. If my partner doesn't come up with it, maybe then I'll mention it." },
			{ key: 'd', text: "I'd stay quiet. Being wrong out loud in front of someone feels worse than staying silent." }
		]
	},
	{
		id: 15,
		text: "You're pairing with someone more senior. They're driving, writing code fast. You're lost. You stopped understanding 5 minutes ago. What do you do?",
		section: 'pairing',
		options: [
			{ key: 'a', text: 'I stop them: "Hold on — can you walk me through what you just did?"' },
			{ key: 'b', text: "I wait for a natural pause and carefully ask a question that doesn't reveal how lost I am." },
			{ key: 'c', text: 'I stay silent and try to reverse-engineer what happened afterwards, on my own.' },
			{ key: 'd', text: "I nod along and feel like a fraud. I tell myself I shouldn't need this explained." }
		]
	},
	{
		id: 16,
		text: "Now flip it. You're the senior one. Your pair is struggling with something you find basic. What's your honest inner reaction?",
		section: 'pairing',
		options: [
			{ key: 'a', text: 'Good — this is exactly where pairing creates value. I get to help someone grow.' },
			{ key: 'b', text: "I'm patient on the outside, but a small part of me wants to just take the keyboard." },
			{ key: 'c', text: "I feel awkward — I don't want to make them feel bad, so I over-explain or just do it myself." },
			{ key: 'd', text: "Frustration. I know I shouldn't feel it, but I do. And then I feel guilty about the frustration." }
		]
	},
	{
		id: 17,
		text: 'After a full day of pair programming, you go home. How do you feel?',
		section: 'pairing',
		options: [
			{ key: 'a', text: "Energised — we built something together and I learned things I wouldn't have alone." },
			{ key: 'b', text: 'Tired but satisfied — like after a long, honest conversation.' },
			{ key: 'c', text: 'Drained — performing for 8 hours is exhausting, even if the code was good.' },
			{ key: 'd', text: "Relieved it's over — like I can finally take off a mask and just be myself again." }
		]
	},
	{
		id: 18,
		text: 'Have you ever learned something important about yourself from working that closely with another person on code?',
		section: 'pairing',
		options: [
			{ key: 'a', text: "Yes — I discovered blind spots I didn't know I had. It made me better." },
			{ key: 'b', text: "Yes — I learned that I care more about what others think of me than I'd like to admit." },
			{ key: 'c', text: 'Yes — I realised how much energy I spend performing "competence" instead of actually thinking.' },
			{ key: 'd', text: "I've avoided it enough that I wouldn't know." }
		]
	}
];

export const sectionIntros = {
	general: {
		title: 'How Safe Do You Really Feel When You Code With Others?',
		subtitle: 'Take a moment. Be honest. Nobody is watching.'
	},
	pairing: {
		title: "Now let's get specific.",
		subtitle: 'The next questions are about pair programming — two people, one screen, thinking out loud together. Let that image sit for a moment before you answer.'
	}
};
