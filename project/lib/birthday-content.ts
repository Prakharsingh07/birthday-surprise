/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE
 *  All text and captions for the birthday site.
 *  Photos live in lib/images.ts (one named slot per photo).
 * ─────────────────────────────────────────────────────────────
 */

import type { ImageSlotName } from './images'

export const candle = {
  label: 'A little moment for you',
  headingLines: ['Before your day begins,', 'make a little wish.'],
  instruction: 'Touch the candle to light it.',
  whileLit: 'Close your eyes. Make your wish.',
  guess: 'Wait... do you know whose birthday it is today?',
  guessButton: 'Take a guess',
}

export const reveal = {
  label: 'Today is all about you',
  // Photo comes from the `birthdayReveal` slot in lib/images.ts
  image: 'birthdayReveal' as ImageSlotName,
  photoCaption: 'the birthday girl',
  headline: 'Happy Birthday, my favourite person.',
  supporting:
    'Today, the world gets to celebrate someone who makes my world a little more beautiful.',
  message: [
    "I don't think I say it enough, so here it is, in writing: you make ordinary days feel like something worth remembering.",
    'Thank you for your laugh, your patience, your soft heart, and every little thing you do without even noticing. I hope this year is as gentle with you as you are with everyone around you.',
    'And I hope you know, today and every other day, how deeply you are loved.',
  ],
  signOff: 'Always yours,',
  signature: 'Me',
  button: 'I have something else for you',
}

export const library = {
  label: 'A little library of us',
  heading: 'A little collection of moments',
  subtitle:
    'Because you deserve to be reminded of how beautiful you are, more than once.',
  hint: 'Ten envelopes. Open them in any order you like.',
  finale:
    "That's all ten, for now. There will be so many more. Happy birthday, love.",
}

export type Memory = {
  title: string
  image: ImageSlotName
  caption: string
}

// One title + caption per envelope. Photos come from the memory01–memory10 slots in lib/images.ts
export const memories: Memory[] = [
  {
    title: 'Favourite you',
    image: 'memory01',
    caption: 'One of my favourite versions of you.',
  },
  {
    title: 'That smile',
    image: 'memory02',
    caption: 'I could look at this smile forever.',
  },
  {
    title: 'Framed twice',
    image: 'memory03',
    caption: 'A memory I wish I could frame twice.',
  },
  {
    title: 'Just you',
    image: 'memory04',
    caption: "Just you being you, and that's enough.",
  },
  {
    title: 'My favourite human',
    image: 'memory05',
    caption: 'My favourite human, in her favourite moments.',
  },
  {
    title: 'Every single time',
    image: 'memory06',
    caption: 'This picture makes me smile every single time.',
  },
  {
    title: 'A reminder',
    image: 'memory07',
    caption: 'A little reminder of how beautiful you are.',
  },
  {
    title: 'Happiness',
    image: 'memory08',
    caption: "If happiness had a face, I think it'd look like you.",
  },
  {
    title: 'One more reason',
    image: 'memory09',
    caption: 'One more reason I fell for you.',
  },
  {
    title: 'Still more',
    image: 'memory10',
    caption: 'And somehow, I still love you more every day.',
  },
]

/**
 * Optional background music.
 * Drop an mp3 into /public (e.g. /public/music.mp3) and set the path below.
 * Leave it as null to use the built-in soft ambient melody instead.
 */
export const musicSrc: string | null = null
