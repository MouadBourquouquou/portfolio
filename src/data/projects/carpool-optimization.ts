import type { Project } from '@core/models/project.model';

export const CARPOOL_OPTIMIZATION: Project = {
  slug: 'carpool-optimization',
  next: 'marocsphere',
  title: 'Carpool Optimization',
  summary: 'An algorithm-driven carpooling tool built to explore optimization and route planning.',
  description:
    'A focused algorithmic project: modeling carpool ride-sharing as a graph problem and applying shortest-path route planning in Python. The emphasis is on the algorithmic core behind ride-sharing — how trips, pickups, and destinations become a problem you can actually compute against.',
  category: 'Algorithms / Optimization',
  role: 'Optimization Developer',
  tags: ['Python', 'Graph Theory', 'Shortest Path'],
  order: 6,
  media: [
    {
      type: 'image',
      src: '/images/projects/carpool-optimization/hero.png',
      alt: 'Carpool optimization — graph-based route planning',
      caption: 'Carpool trips modeled as a graph, solved with shortest-path planning.',
    },
    {
      type: 'image',
      src: '/images/projects/carpool-optimization/visualization.png',
      label: 'Algorithm',
      alt: 'Shortest-path route visualization over the carpool graph',
      caption: 'Route and assignment computation over pickups and destinations.',
    },
  ],
  ogImage: '/images/projects/carpool-optimization/og.png',
  ogImageAlt: 'Carpool Optimization — graph algorithms in Python',
  problem:
    'Carpooling is fundamentally a routing problem: given pickups, drop-offs, and vehicle constraints, find sensible routes and assignments. The project’s goal was to implement and evaluate graph-based shortest-path approaches to that problem — keeping the scope on the algorithm rather than a full product.',
  problemPoints: [
    'A carpool trip is naturally expressed as a graph: locations as nodes, road connections as edges.',
    'Route quality depends on which path metric you optimize, so the objective has to be stated up front.',
    'The algorithmic core must be understood cleanly before any product complexity is added.',
  ],
  contribution:
    'I implemented the graph model and the route-planning logic in Python — expressing carpool trips as graphs and applying shortest-path computation to explore the optimization of routes.',
  contributionPoints: [
    'Modeled carpool trips as a graph problem in Python.',
    'Implemented shortest-path route planning over the model.',
  ],
  decisions: [
    {
      title: 'Graph modeling first',
      body: 'Modeling pickups, drop-offs, and road connections as a graph made the optimization legible: nodes and edges turned an ambiguous routing problem into a concrete shortest-path computation.',
    },
    {
      title: 'Python for fast iteration',
      body: 'Python made it easy to experiment with different route-planning variants without fighting the language — the right tool when the goal is algorithmic insight rather than production throughput.',
    },
    {
      title: 'A focused algorithmic scope',
      body: 'Restricting the scope to the shortest-path core — rather than a full ride-sharing product — kept the study precise, so the optimization itself, not surrounding feature creep, carried the result.',
    },
  ],
  result:
    'Produced a Python implementation that models carpool trips as graphs and applies shortest-path route planning — a clean, focused demonstration of the algorithmic core behind a carpooling service.',
  learnings: [
    'Stating the objective (shortest path, feasible assignment) before writing code is what keeps an algorithm project rigorous.',
    'Choosing the right abstraction early — the graph — made the optimization legible instead of buried in data structures.',
    'A tight scope around the algorithm delivers sharper insight than a broad-but-shallow implementation.',
  ],
};
