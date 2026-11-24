/**
 * ─────────────────────────────────────────────────────────────
 *  IMAGE SLOTS — the only place image files are referenced.
 *
 *  To add a photo to a slot:
 *    1. Put the file in /public/photos/ (e.g. public/photos/memory-03.jpg)
 *    2. Set that slot's `src` to "/photos/<file name>"
 *    3. Describe the photo in `alt` and set `placeholder: false`
 *
 *  Slots marked `placeholder: true` still show a stand-in image.
 *  `finalMemory` is hidden until you give it a `src`; it then appears
 *  above the closing note once all ten envelopes are opened.
 * ─────────────────────────────────────────────────────────────
 */

export type ImageSlot = {
  src: string | null
  alt: string
  placeholder: boolean
}

export type ImageSlotName =
  | 'birthdayReveal'
  | 'memory01'
  | 'memory02'
  | 'memory03'
  | 'memory04'
  | 'memory05'
  | 'memory06'
  | 'memory07'
  | 'memory08'
  | 'memory09'
  | 'memory10'
  | 'finalMemory'

export const images: Record<ImageSlotName, ImageSlot> = {
  // Reveal page polaroid (after "Take a guess")
  birthdayReveal: {
    src: '/photos/birthday-reveal.jpg',
    alt: 'Her winking playfully with a peace sign while taking a mirror selfie',
    placeholder: false,
  },

  // Envelopes 01–10 in the "little library"
  memory01: {
    src: '/photos/memory-01.jpg',
    alt: 'Her laughing in a white top with a blue flower tucked in her hair',
    placeholder: false,
  },
  memory02: {
    src: '/photos/memory-02.jpg',
    alt: 'A close-up selfie of her smiling softly in a red top',
    placeholder: false,
  },
  memory03: { src: '/photos/memory-03.png', alt: 'PLACEHOLDER — memory 03', placeholder: true },
  memory04: { src: '/photos/memory-04.png', alt: 'PLACEHOLDER — memory 04', placeholder: true },
  memory05: { src: '/photos/memory-05.png', alt: 'PLACEHOLDER — memory 05', placeholder: true },
  memory06: { src: '/photos/memory-06.png', alt: 'PLACEHOLDER — memory 06', placeholder: true },
  memory07: { src: '/photos/memory-07.png', alt: 'PLACEHOLDER — memory 07', placeholder: true },
  memory08: { src: '/photos/memory-08.png', alt: 'PLACEHOLDER — memory 08', placeholder: true },
  memory09: { src: '/photos/memory-09.png', alt: 'PLACEHOLDER — memory 09', placeholder: true },
  memory10: { src: '/photos/memory-10.png', alt: 'PLACEHOLDER — memory 10', placeholder: true },

  // Shown with the closing note after all ten envelopes are opened
  finalMemory: { src: null, alt: 'PLACEHOLDER — final memory', placeholder: true },
}

export const memorySlots = [
  'memory01',
  'memory02',
  'memory03',
  'memory04',
  'memory05',
  'memory06',
  'memory07',
  'memory08',
  'memory09',
  'memory10',
] as const satisfies readonly ImageSlotName[]
