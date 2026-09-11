import type { Article } from '@core/models/article.model';

export const DOCKER_EXPLAINED: Article = {
  slug: 'docker-explained',
  categoryKey: 'docker',
  title: 'Docker explained simply: why containers are useful',
  excerpt:
    'What problems Docker solves, what images and containers are, and how a web app plus a database can run the same way on every machine.',
  readingMinutes: 10,
  year: '2026',
  datePublished: '2026-09-11',
  dateModified: '2026-09-11',
  seoTitle: 'Docker Explained: Images, Containers and Compose',
  seoDescription:
    'Containers explained for beginners: the problems Docker solves, images vs containers, Dockerfiles, volumes, ports, and running an app with Docker Compose.',
  ogImage: '/images/blog/docker-explained/og.png',
  ogImageAlt: 'Docker explained — images, containers and Compose',
  intro:
    '“It works on my machine” is one of the most common sentences in software. Docker is the answer to that sentence: it packages an application together with its environment, so it runs the same way anywhere — on a teammate’s laptop, on a server, in a CI pipeline.',
  blocks: [
    {
      type: 'heading',
      text: 'The problem Docker solves',
    },
    {
      type: 'paragraph',
      text: 'A project rarely runs on “a machine”. It runs on a specific version of a language, a specific database, specific system libraries, and specific environment variables. All of that can differ between machines, which is why a project that starts fine on your machine breaks on a colleague’s. Docker moves the whole environment into the project itself, in a packaged, reproducible form.',
    },
    {
      type: 'paragraph',
      text: 'The group-project example is telling. One teammate runs Node 18, another Node 22; one has PostgreSQL installed locally on a specific port, another has never installed it at all. The code is identical — the environments are what differ — and an afternoon disappears reconciling them. Docker takes the environment question off the table: the environment is described inside the project itself.',
    },
    {
      type: 'heading',
      text: 'Images and containers',
    },
    {
      type: 'paragraph',
      text: 'Two words cover most of the mental model:',
    },
    {
      type: 'list',
      items: [
        'Image — a read-only template: the application code plus everything it needs to run. Built from a file called a Dockerfile.',
        'Container — a running instance of an image. You can run several containers from the same image, and a container can be started, stopped and deleted without touching the others.',
      ],
    },
    {
      type: 'paragraph',
      text: 'If an image is a recipe, a container is a meal cooked from it.',
    },
    {
      type: 'heading',
      text: 'A Dockerfile',
    },
    {
      type: 'paragraph',
      text: 'A Dockerfile is a list of instructions for building an image. A small Node.js example:',
    },
    {
      type: 'code',
      title: 'Dockerfile',
      language: 'dockerfile',
      body: 'FROM node:20\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD ["npm", "start"]',
    },
    {
      type: 'paragraph',
      text: 'FROM picks a base image, COPY adds files, RUN executes a command while building, and CMD defines the command that runs when the container starts. Every line is cached, so rebuilding after a small change is usually fast.',
    },
    {
      type: 'heading',
      text: 'Layers and caching',
    },
    {
      type: 'paragraph',
      text: 'Each instruction in a Dockerfile produces a layer, and Docker caches every layer. Change only the application code, and all the layers above stay reused — which is why writing COPY package*.json before COPY . is a habit: dependencies are installed once, then the app files are copied on top. A well-ordered Dockerfile turns “why does every rebuild take ten minutes?” into “why is this rebuild so fast?”.',
    },
    {
      type: 'heading',
      text: 'Ports, volumes and environment variables',
    },
    {
      type: 'list',
      items: [
        'Ports — a container has its own networking space. You map a port outside to a port inside, so localhost:8080 reaches the application inside the container.',
        'Volumes — containers are ephemeral; a volume keeps data (like database content) alive outside the container’s filesystem.',
        'Environment variables — configuration such as database URLs and credentials, passed in at run time instead of being hardcoded in the image.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Together they are what make one image reusable in different situations: the same image can point at a local database in development and a real one in production, just by changing the environment variables.',
    },
    {
      type: 'heading',
      text: 'Multiple services with Docker Compose',
    },
    {
      type: 'paragraph',
      text: 'Real applications are usually more than one process. Docker Compose describes several services in one YAML file and starts them together with one command. A stack that looks like the projects I work on — an Angular frontend calling a Spring Boot API backed by PostgreSQL — can run as three containers:',
    },
    {
      type: 'code',
      title: 'docker-compose.yml (simplified)',
      language: 'yaml',
      body: 'services:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_DB: app\n    volumes:\n      - db-data:/var/lib/postgresql/data\n  api:\n    build: ./backend\n    environment:\n      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/app\n    ports:\n      - "8080:8080"\n  web:\n    build: ./frontend\n    ports:\n      - "4200:4200"\nvolumes:\n  db-data:',
    },
    {
      type: 'paragraph',
      text: 'docker compose up builds and starts the whole stack. The services can reach each other by name (db, api, web), which is why the Spring Boot API can point its datasource URL directly at the database container instead of a hardcoded IP.',
    },
    {
      type: 'heading',
      text: 'Debugging a running stack',
    },
    {
      type: 'paragraph',
      text: 'Containers are easy to inspect while they run. docker ps shows what is running, docker logs <service> streams a container’s output, and docker exec -it <service> sh opens a shell inside it — and in a Compose stack the service names map directly to these commands. Debugging inside a container looks like normal debugging, only the shell lives elsewhere.',
    },
    {
      type: 'heading',
      text: 'Containers in the build pipeline',
    },
    {
      type: 'paragraph',
      text: 'The same reproducibility that fixes mismatched laptops also fixes the build pipeline: a CI job that runs the tests inside the same image used locally gets identical results by construction. That is the practical payoff people mean when they say “Docker everywhere” — one description of the environment, used from a local shell to a build server.',
    },
    {
      type: 'heading',
      text: 'Where I’ve met this in practice',
    },
    {
      type: 'paragraph',
      text: 'This is not abstract theory for me: in the MarocSphere project, Docker was part of how I worked on the backend and deployed the platform, running the stack the same way on every machine instead of tuning each setup by hand. It also made the handoff cleaner — a new contributor could clone the repository, run docker compose up, and get the whole stack instead of assembling dependencies one by one.',
    },
    {
      type: 'heading',
      text: 'What this article does not cover',
    },
    {
      type: 'paragraph',
      text: 'Deliberately not covered: Kubernetes, orchestration at scale and microservices architecture. Containers solve a focused problem — packaging an application with its environment. For a student project or a modest team deployment, Docker alone is usually exactly the right amount of tooling.',
    },
    {
      type: 'heading',
      text: 'Wrapping up',
    },
    {
      type: 'paragraph',
      text: 'Docker’s value comes down to reproducibility: an image carries the code and its environment, a container runs it, volumes and environment variables keep configuration and data separate, and Compose ties multiple services together. Once a stack runs in containers, “works on my machine” stops being a discussion.',
    },
  ],
  related: [{ type: 'project', slug: 'marocsphere' }],
};
