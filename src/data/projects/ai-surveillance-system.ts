import type { Project } from '@core/models/project.model';

export const AI_SURVEILLANCE_SYSTEM: Project = {
  slug: 'ai-surveillance',
  next: 'syndic',
  title: 'AI Surveillance System',
  summary:
    'Worked across a four-person AI/computer-vision team, in collaboration with a startup, building a cafe-surveillance detection system from labeled data to working YOLO inference.',
  description:
    'As the computer-vision developer on a team of four, and in collaboration with a startup, I helped build a computer-vision monitoring system for a cafe-surveillance use case. The project ran the full applied-AI path — acquiring and labeling data, training a detector with YOLO, and wiring inference into a real monitoring context — with the emphasis on moving from raw footage to working detections across a coherent four-person effort.',
  category: 'AI / Computer Vision',
  role: 'AI Project Coordinator',
  tags: ['Python', 'YOLO', 'Roboflow', 'Kaggle', 'Google Colab'],
  order: 1,
  media: [
    {
      type: 'image',
      src: '/images/projects/ai-surveillance/hero.png',
      alt: 'AI surveillance system — YOLO detection pipeline',
      caption: 'Cafe-surveillance detection, from labeled data to YOLO inference.',
    },
    {
      type: 'image',
      src: '/images/projects/ai-surveillance/detection.png',
      label: 'Pipeline',
      alt: 'Inference frame with object-detection bounding boxes',
      caption: 'Working detections against real cafe footage.',
    },
    {
      type: 'image',
      src: '/images/projects/ai-surveillance/architecture.png',
      label: 'Architecture',
      alt: 'AI surveillance data pipeline diagram',
      caption: 'Data curation with Roboflow, training on Colab, inference in production.',
    },
  ],
  ogImage: '/images/projects/ai-surveillance/og.png',
  ogImageAlt: 'AI Surveillance System — computer vision monitoring',
  problem:
    'Real-world surveillance footage is noisy — lighting, angles, and occlusions vary constantly — and detection quality is ultimately capped by labeled data, not model choice. Working with a startup gave us a concrete cafe-monitoring use case to aim at. As a team of four, we still had to keep annotation, training, and integration coordinated tightly enough that everyone could contribute without degrading the data.',
  problemPoints: [
    'Cafe-surveillance footage is noisy and varied, so environment handling drives real-world quality.',
    'Detection quality is capped by data quality — labeling discipline was the real engineering.',
    'A team of four needed one shared workflow for labeling, training, and sharing results.',
  ],
  contribution:
    "I worked as the computer-vision developer and coordinated the team of four across data, training, and integration. I owned the data pipeline and drove detection from curated datasets to working YOLO inference against the startup's cafe-surveillance use case.",
  contributionPoints: [
    'Coordinated the four-person effort across data, training, and integration end to end.',
    'Collaborated with a startup around a real cafe-surveillance monitoring use case.',
    'Owned data curation and labeling through Roboflow; sourced public training data via Kaggle.',
    'Drove training and iteration on Google Colab.',
  ],
  decisions: [
    {
      title: 'YOLO for real-time detection',
      body: 'A surveillance scenario demands detections that follow the footage rather than lag it. We used YOLO — a single-stage detector fast enough for live inference — and fine-tuned from solid pretrained weights instead of training from scratch.',
    },
    {
      title: 'Roboflow as the data layer',
      body: 'Labeling, versioning, and exporting datasets by hand across a whole team is a recipe for inconsistency. Roboflow gave us a shared annotation and export pipeline so all four people iterated on the same dataset versions.',
    },
    {
      title: 'Kaggle for training data',
      body: 'A surveillance project needs enough diverse examples to be useful. Public Kaggle datasets let us bootstrap the training set before investing in custom labeling.',
    },
    {
      title: 'Google Colab for training',
      body: 'GPU time came on demand in Colab, so the entire loop — train, validate, export weights — ran in notebooks without us provisioning hardware. It made iterating fast when the real bottleneck was data experimentation.',
    },
  ],
  result:
    'Delivered a working detection pipeline for the startup collaboration: a YOLO detector trained on curated data, producing inference for the cafe-surveillance scenario. A functioning end-to-end team project — raw footage in, detections out.',
  learnings: [
    'Most of a vision project is data quality and labeling discipline; the model choice is the comparatively easy part.',
    'Coordinating a four-person student project came down to owning the shared contracts — the labels, exports, and versions everyone else built on.',
    'Collaborating with a startup forced trade-offs between an interesting AI problem and a usable monitoring outcome.',
    'Notebook-driven training on Colab is fast, but explicit versioning of datasets and weights is what keeps a team aligned.',
  ],
};
