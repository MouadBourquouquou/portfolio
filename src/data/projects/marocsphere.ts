import type { Project } from '@core/models/project.model';

export const MAROCSPHERE: Project = {
  slug: 'marocsphere',
  next: 'ai-surveillance',
  title: 'MarocSphere',
  summary:
    'An end-to-end platform combining Angular, Spring Boot, and applied AI — engineered from architecture down to the interface.',
  description:
    'MarocSphere is an AI-powered tourism platform focused on Morocco. It brings personalized itinerary generation, maps, and discovery of local tourism services into a single product — spanning an Angular frontend, a Spring Boot API, PostgreSQL persistence, and an AI layer integrated into the itinerary flow.',
  year: '',
  category: 'Product Development',
  role: 'Full-Stack Developer · Team Coordinator',
  tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'AI', 'Docker', 'Cloudflare'],
  featured: true,
  order: 0,
  media: [
    {
      type: 'image',
      src: '/images/projects/marocsphere/hero.png',
      alt: 'MarocSphere platform — personalized itinerary dashboard',
      caption: 'MarocSphere — an AI-powered tourism platform for Morocco.',
    },
    {
      type: 'image',
      src: '/images/projects/marocsphere/dashboard.png',
      label: 'Screens',
      alt: 'MarocSphere dashboard — itinerary planning tools',
      caption: 'Itinerary generation flow built from traveler preferences.',
    },
    {
      type: 'image',
      src: '/images/projects/marocsphere/itinerary.png',
      label: 'Screens',
      alt: 'MarocSphere itinerary view — maps and local tourism services',
      caption: 'Generated itinerary with maps and local-service discovery.',
    },
  ],
  ogImage: '/images/projects/marocsphere/og.png',
  ogImageAlt: 'MarocSphere — AI-powered tourism platform for Morocco',
  problem:
    'Planning a trip through Morocco usually means stitching together fragmented sources — generic guides, scattered listings, map tools, and booking sites — and assembling an itinerary by hand. The result is a slow planning loop with little personalization. The platform brief was to bring itinerary generation, local-service discovery, and maps into one cohesive, AI-assisted flow.',
  problemPoints: [
    'Itinerary planning was manual: travelers assembled routes from unrelated sources.',
    'Local tourism services were distributed across many channels with no single point of discovery.',
    'The product needed to justify an AI layer without turning it into a gimmick.',
  ],
  contribution:
    "As a full-stack developer on MarocSphere, I built across the Angular frontend and the Spring Boot backend, coordinated the team's day-to-day tasks, and supported testing and deployment.",
  contributionPoints: [
    'Contributed to shaping the architecture: an Angular frontend, a Spring Boot API, PostgreSQL persistence, and an integrated AI layer.',
    'Coordinated the four-person team around a shared backlog and agreed API contracts, keeping integration on track.',
    'Contributed the backend build and testing, including the AI integration that powers itinerary generation.',
    'Handled deployment — packaging the platform with Docker and delivering it through Cloudflare.',
  ],
  decisions: [
    {
      title: 'Angular for the product surface',
      body: 'The tourism flow is content-dense — itineraries, maps, listings — and benefits from a typed, component-based frontend. Angular gave us structured data binding and a predictable project structure that scaled across several contributors without drifting apart.',
    },
    {
      title: 'Spring Boot as the API backbone',
      body: 'Tourism planning involves distinct domain flows — itineraries, maps, listings, profiles — and Spring Boot’s layered conventions (controllers, services, repositories) plus static typing kept those boundaries reviewable and explicit across several contributors.',
    },
    {
      title: 'PostgreSQL for structured domain data',
      body: 'Itineraries, user profiles, and tourism services are relational in nature. PostgreSQL gave us referential integrity, transactions, and stable migrations — the kind of guarantees a multi-feature platform should build on rather than retrofit later.',
    },
    {
      title: 'AI integrated into the itinerary flow',
      body: 'The AI layer generates personalized itineraries from traveler preferences and Moroccan tourism content. The value was placed in the product flow — a planner that adapts to what people actually want to do — instead of AI bolted on as a separate demo feature.',
    },
    {
      title: 'Docker for consistency across the team',
      body: 'With several people working on the platform, environment drift was the main risk to “works on my machine.” Containerizing the backend, database, and services meant everyone ran the same stack, and the platform could be handed over and deployed reproducibly.',
    },
    {
      title: 'Cloudflare for delivery',
      body: 'Deployment was kept lean by shipping behind Cloudflare’s managed edge layer, which handled public exposure and delivery without us operating our own infrastructure. For a small team, reducing the operations surface was an architectural decision as much as an operational one.',
    },
    {
      title: 'k6 and Postman for verification',
      body: 'Correctness and load were treated as part of engineering, not an afterthought: Postman collections validated API behavior against agreed contracts, and k6 exercised load characteristics before release — building confidence into the delivery loop.',
    },
    {
      title: 'Git/GitHub workflow',
      body: 'A multi-person platform stays coherent only if the shared history does. Branch-based work, pull requests, and a centralized repository on GitHub gave us review points and a dependable record of what changed and why.',
    },
  ],
  result:
    'The project produced a working, integrated tourism platform: an Angular interface backed by a Spring Boot API with PostgreSQL persistence and an AI layer for itinerary generation, packaged with Docker and delivered through Cloudflare. It shipped as a coordinated team effort.',
  learnings: [
    'Defining API contracts before feature work is what keeps integration cheap in a team.',
    'Testing at two levels — Postman for correctness, k6 for load — surfaced issues a unit suite alone would miss.',
    'Containerizing early eliminated the environment drift that usually burns a team’s most expensive hours.',
    'An AI feature is only as useful as the content structure behind it; shaping the data model mattered as much as the model itself.',
    'Deployment choices like Docker and Cloudflare are product decisions — they set the pace at which the team can ship.',
  ],
};
