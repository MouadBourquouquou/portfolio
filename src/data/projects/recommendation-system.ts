import type { Project } from '@core/models/project.model';

export const RECOMMENDATION_SYSTEM: Project = {
  slug: 'recommendation-system',
  next: 'carpool-optimization',
  title: 'Recommendation System',
  summary:
    'A large-scale recommendation system exploring distributed stream and batch processing for personalization.',
  description:
    'An engineering exploration of recommendation at scale: processing large volumes of behavioral data with distributed engines — Apache Spark for batch, Apache Flink for streaming — and MongoDB for flexible storage of the data flowing through the pipeline.',
  category: 'Data / Big Data',
  role: 'Data Engineer',
  tags: ['Apache Spark', 'Apache Flink', 'MongoDB'],
  order: 5,
  media: [
    {
      type: 'image',
      src: '/images/projects/recommendation-system/hero.png',
      alt: 'Recommendation system — distributed pipeline',
      caption: 'A recommendation pipeline at scale — Spark, Flink, MongoDB.',
    },
    {
      type: 'image',
      src: '/images/projects/recommendation-system/results.png',
      label: 'Pipeline',
      alt: 'Recommendation pipeline — batch and streaming stages',
      caption: 'Batch and streaming transformations feeding recommendations.',
    },
  ],
  ogImage: '/images/projects/recommendation-system/og.png',
  ogImageAlt: 'Recommendation System — Spark / Flink / MongoDB',
  problem:
    'Recommendation quality depends on processing large, continuous sets of behavioral data cheaply and reliably. The project studied how batch and streaming engines can be combined to shape a recommendation pipeline at scale — focusing on architecture and feasibility rather than benchmarked metrics.',
  problemPoints: [
    'Behavioral data arrives continuously and in large volumes, so processing must be both batched and streamed.',
    'Storage needs to accept high-volume, heterogeneous event data without a rigid schema.',
    'The architecture choice (stream vs. batch) has to be made before the pipeline logic is written.',
  ],
  contribution:
    'I worked on the processing layer — building the Spark and Flink pipelines that transform behavioral data and feed a MongoDB-backed store for recommendations.',
  contributionPoints: [
    'Built the batch pipeline with Apache Spark.',
    'Built the streaming pipeline with Apache Flink.',
    'Designed MongoDB storage for the high-volume data at the pipeline’s edges.',
  ],
  decisions: [
    {
      title: 'Apache Spark for batch processing',
      body: 'Large, offline behavioral datasets suit a mature batch engine. Spark’s structured APIs made the transformations legible and scalable, giving recomputed recommendation inputs a dependable path.',
    },
    {
      title: 'Apache Flink for streaming',
      body: 'When behavioral data needs to influence recommendations near-real-time, a stream engine is the right shape. Flink provides low-latency, fault-tolerant stream processing — handling continuous input instead of periodic recomputation.',
    },
    {
      title: 'MongoDB for flexible storage',
      body: 'High-volume event data is heterogeneous and schema-shifty by nature. MongoDB’s document model absorbed that variation cleanly at the pipeline’s edges, where rigid relational schemas would have constrained ingestion.',
    },
  ],
  result:
    'Built a working recommendation pipeline: Spark and Flink process large behavioral datasets, with MongoDB storing the pipeline’s inputs and outputs — an architecture-level demonstration of how recommendations can be computed at scale.',
  learnings: [
    'Batch versus stream is a latency-and-cost trade-off, and that architecture decision drives everything downstream in the pipeline.',
    'Distributed engines shift your thinking from loops to stages — the shape of the pipeline is effectively the program.',
    'Schema-flexible storage (MongoDB) at the edges keeps ingestion simple when event data refuses to stay uniform.',
  ],
};
