import type { Article } from '@core/models/article.model';

export const ALGORITHM_COMPLEXITY: Article = {
  slug: 'algorithm-complexity',
  categoryKey: 'algorithms',
  title: 'Algorithm complexity: understanding Big O without the headache',
  excerpt:
    'What Big O really means, why two correct algorithms can run very differently, and where complexity thinking shows up in data and graph work.',
  readingMinutes: 11,
  year: '2026',
  datePublished: '2026-09-11',
  dateModified: '2026-09-11',
  seoTitle: 'Big O Explained: Algorithm Complexity Made Simple',
  seoDescription:
    'Time and space complexity explained with simple examples: O(1), O(log n), O(n), O(n log n) and O(n²), and why the right algorithm matters.',
  ogImage: '/images/blog/algorithm-complexity/og.png',
  ogImageAlt: 'Algorithm complexity — Big O without the headache',
  intro:
    'Two programs can both be correct and still run at completely different speeds. The reason is usually algorithmic complexity — how much work the algorithm does as the input grows. This note explains the idea with simple examples, without the math anxiety.',
  blocks: [
    {
      type: 'heading',
      text: 'What an algorithm is',
    },
    {
      type: 'paragraph',
      text: 'An algorithm is simply a sequence of steps that turns an input into an output — a recipe for computation. Sorting a list, finding an item, or computing the shortest path between two places in a graph are all computational problems that you solve with some algorithm.',
    },
    {
      type: 'heading',
      text: 'Why complexity matters',
    },
    {
      type: 'paragraph',
      text: '“Correct” is not the same as “fast enough”. Your program might be perfectly correct and still take minutes on data your algorithm was never designed for. Complexity is the tool we use to talk about that in advance: it describes how the cost of an algorithm grows when the input grows, instead of measuring one lucky run on a specific machine.',
    },
    {
      type: 'heading',
      text: 'Time and space complexity',
    },
    {
      type: 'list',
      items: [
        'Time complexity — roughly the number of steps an algorithm takes as a function of the input size n.',
        'Space complexity — the amount of extra memory it uses as a function of n.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Big O notation describes the growth rate, ignoring constants: O(n) means linear growth, O(n²) means quadratic growth. The point is the shape of the curve, not the exact number of operations.',
    },
    {
      type: 'heading',
      text: 'The common Big O classes',
    },
    {
      type: 'paragraph',
      text: 'A few classes cover most of what you’ll meet, ordered from cheapest to most expensive:',
    },
    {
      type: 'list',
      items: [
        'O(1) — constant time. The work does not depend on the input size. Reading the third element of an array is O(1): the array knows where each element lives.',
        'O(log n) — logarithmic time. Each step halves the problem. Binary search on sorted data is the classic example.',
        'O(n) — linear time. The work grows exactly with the input. Scanning an array to find one value is O(n).',
        'O(n log n) — “linearithmic”. Efficient sorting algorithms such as merge sort and quicksort cost this.',
        'O(n²) — quadratic time. Nested loops over the same collection. Fine for small n, painful as n grows.',
      ],
    },
    {
      type: 'code',
      title: 'Find an element in an array — O(n)',
      language: 'python',
      body: 'for item in items:\n    if item == target:\n        return True',
    },
    {
      type: 'code',
      title: 'Binary search on sorted data — O(log n)',
      language: 'python',
      body: 'low, high = 0, len(items) - 1\nwhile low <= high:\n    mid = (low + high) // 2\n    if items[mid] == target:\n        return mid\n    if items[mid] < target:\n        low = mid + 1\n    else:\n        high = mid - 1',
    },
    {
      type: 'code',
      title: 'Nested loop over the same collection — O(n²)',
      language: 'python',
      body: 'for i in items:\n    for j in items:\n        if i + j == target:\n            return True',
    },
    {
      type: 'paragraph',
      text: 'Two habits keep Big O readable. First, drop the constants: an algorithm that always does twice the work still belongs to the same growth class — O(2n) is really O(n), because what matters is how the cost scales, not the factor. Second, keep only the fastest-growing term: O(n² + n) is O(n²), since the linear part becomes irrelevant as n grows. These simplifications are what let you compare algorithms by shape instead of by noise.',
    },
    {
      type: 'code',
      title: 'Find the same element in a hash set — O(1) average',
      language: 'python',
      body: 'if target in items:\n    return True',
    },
    {
      type: 'paragraph',
      text: 'The same question in an array costs O(n), in a balanced tree O(log n), and in a hash set roughly O(1) on average. Same query, same data, three different shapes of growth — the right choice depends on what the data looks like and how it is queried, not on a single “best” structure.',
    },
    {
      type: 'heading',
      text: 'Why two correct algorithms can be very different',
    },
    {
      type: 'paragraph',
      text: 'Correctness answers “does it work?”; complexity answers “does it still work when the input is big?”. The gap becomes obvious with numbers. With one million items, an O(n) scan costs about a million steps, while an O(n²) algorithm costs around a trillion — a difference of a few milliseconds versus minutes or hours. Both are correct; only one is usable.',
    },
    {
      type: 'heading',
      text: 'Hidden complexity',
    },
    {
      type: 'paragraph',
      text: 'Real programs hide complexity inside library calls. Removing an element from the middle of a list can shift everything around — cheap-looking code with an O(n) or O(n²) tail. Concatenating strings in a loop is a classic quadratic trap. The skill is not memorizing every implementation; it is noticing when a familiar function does more work than it looks like, and then verifying with data of realistic size instead of arguing.',
    },
    {
      type: 'heading',
      text: 'Reasoning in practice',
    },
    {
      type: 'paragraph',
      text: 'You rarely need a formal proof — an estimate is enough. How big can the input realistically get, and what does the growth curve do there? At a few thousand items, an O(n²) scan is sometimes perfectly fine; at a million, the same code stops being fine overnight. Complexity gives you a two-line argument for choosing one approach over another in a code review, and it catches performance surprises before they become incidents.',
    },
    {
      type: 'heading',
      text: 'Where this shows up in my projects',
    },
    {
      type: 'paragraph',
      text: 'Complexity is not a classroom-only idea. In my Carpool Optimization project, ride-sharing is modeled as a graph problem and solved with shortest-path route planning — graph algorithms exist precisely to keep such searches efficient on real-sized inputs. In my Recommendation System work, large volumes of behavioral data flow through Apache Spark for batch processing and Apache Flink for streaming, where the cost of joins and aggregation depends directly on the algorithms behind the engines.',
    },
    {
      type: 'heading',
      text: 'Wrapping up',
    },
    {
      type: 'paragraph',
      text: 'You rarely need to prove tight bounds; you need to estimate growth. Before choosing an approach, ask: how does the work scale with the input, and is that acceptable for the data I’ll really have? Naming O(n) vs O(n log n) vs O(n²) gives you a shared, precise language for that decision — for interviews, code reviews, and your own design choices.',
    },
  ],
  related: [{ type: 'project', slug: 'carpool-optimization' }],
};
