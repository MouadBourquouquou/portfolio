import type { Article } from '@core/models/article.model';

export const GIT_AND_GITHUB: Article = {
  slug: 'git-and-github',
  categoryKey: 'github',
  title: 'Git and GitHub: what each one actually does',
  excerpt:
    'Git manages version history on your machine. GitHub gives a team a shared place to collaborate around that history. Here is how they fit together.',
  readingMinutes: 8,
  year: '2026',
  datePublished: '2026-09-11',
  dateModified: '2026-09-11',
  seoTitle: 'Git vs GitHub: How They Work Together',
  seoDescription:
    'The difference between Git and GitHub, and how local repositories, remotes, pull requests, issues and reviews fit into a normal team workflow.',
  ogImage: '/images/blog/git-and-github/og.png',
  ogImageAlt: 'Git and GitHub — how version control and collaboration fit together',
  keyIdea:
    'Git manages version history. GitHub gives a team a place to collaborate around that history.',
  intro:
    'People new to version control often use the words “Git” and “GitHub” interchangeably. They are two different things that work as a pair. This note is the short version of how the pair fits together, as a complement to the article on the Git workflow.',
  blocks: [
    {
      type: 'heading',
      text: 'Git vs GitHub',
    },
    {
      type: 'paragraph',
      text: 'Git is a tool installed on your machine. It tracks versions of a project locally, works completely offline, and does not need an account or an internet connection. GitHub is a web platform where teams store repositories online. It hosts the same Git repositories and adds collaboration tools around them: pull requests, code review, issues, documentation rendering, and automation.',
    },
    {
      type: 'heading',
      text: 'Local repository vs remote repository',
    },
    {
      type: 'paragraph',
      text: 'A repository exists in two related places. The local repository lives on your machine and is what you commit to every day. The remote repository is a shared copy — typically on GitHub — that everyone pulls from and pushes to. They are not duplicates you have to maintain manually; the three commands keep them in sync:',
    },
    {
      type: 'code',
      title: 'Staying in sync',
      language: 'bash',
      body: 'git clone https://github.com/team/project.git\ngit pull\ngit push',
    },
    {
      type: 'paragraph',
      text: 'git clone downloads a remote repository for the first time. git pull brings the latest changes from the remote into your local one. git push sends your local commits to the remote so the rest of the team can see them.',
    },
    {
      type: 'heading',
      text: 'Branches and pull requests on GitHub',
    },
    {
      type: 'paragraph',
      text: 'Branches exist in Git itself. GitHub adds a structured way to finish them: instead of merging a branch silently, you open a pull request proposing “this branch should be merged into main”. Team members then review the diff line by line, leave comments, request changes, and approve. Everything is recorded, so the decision history stays visible long after the merge.',
    },
    {
      type: 'heading',
      text: 'Issues and README',
    },
    {
      type: 'paragraph',
      text: 'Two small GitHub features carry a lot of weight in a project. Issues are tickets for tasks and bugs — describing a problem, linking it to the branch that fixes it, and closing it when the pull request merges. The README is the first document people read: what the project does, how to run it, and how to contribute. A project without a README is a project that expects people to guess.',
    },
    {
      type: 'heading',
      text: 'Repository organization',
    },
    {
      type: 'paragraph',
      text: 'A well-kept repository is mostly a habit: a clear name, a README that is actually maintained, a .gitignore for build artifacts, folders that match the project’s structure, and branch protection so the main branch only changes through reviewed pull requests. None of this requires expertise — it is consistency that pays off.',
    },
    {
      type: 'paragraph',
      text: 'If you are starting a repository today, commit habits are the cheapest form of organization: commit often, commit small, and write messages that explain why. Everything else — profiles, labels, templates — is polish that compounds on top of a clean history.',
    },
    {
      type: 'heading',
      text: 'Pull requests done right',
    },
    {
      type: 'paragraph',
      text: 'A pull request is a claim that a branch is finished and ready to merge. The most useful ones are small: one branch, one concern. The description should say what the change does, why, link the issue it closes, and note anything the reviewer should run to test it. When a pull request grows too big, reviewers skim; when it stays focused, code review actually generates conversation.',
    },
    {
      type: 'heading',
      text: 'Automation between the pull request and the merge',
    },
    {
      type: 'paragraph',
      text: 'Between proposing a change and merging it, most repositories run checks. A GitHub Actions workflow runs on every push: install dependencies, run the linters and the tests, and report the result right on the pull request. The shift is small but meaningful — instead of trusting a teammate’s word that the tests pass, the pull request shows the checks themselves.',
    },
    {
      type: 'code',
      title: 'A minimal workflow (simplified)',
      language: 'yaml',
      body: 'name: CI\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test',
    },
    {
      type: 'paragraph',
      text: 'The syntax matters less than the point: the repository defines its own quality gate, and every change must pass it before the merge.',
    },
    {
      type: 'heading',
      text: 'Organizations, forks and permissions',
    },
    {
      type: 'paragraph',
      text: 'As a project grows, the permission question gets answered differently. Team members usually work together in one shared repository, using branches and pull requests. Outside contributors, by contrast, fork the repository — creating a personal copy — and open pull requests from that copy. Both flows use the exact same Git commands; only the structure of the remote changes.',
    },
    {
      type: 'heading',
      text: 'How they fit together: a team workflow',
    },
    {
      type: 'code',
      title: 'A normal round on GitHub',
      language: 'text',
      body: 'Clone the repo\n    ↓\nCreate a branch\n    ↓\nCommit + push\n    ↓\nOpen a Pull Request\n    ↓\nReview + fix\n    ↓\nMerge',
    },
    {
      type: 'paragraph',
      text: 'The loop is deliberately small: Git does the version control locally, the remote keeps everyone synchronized, and the pull request is the review gate. On well-run repositories, the main branch only changes through this path — so the history stays readable and every change is linked to a discussion.',
    },
    {
      type: 'heading',
      text: 'Wrapping up',
    },
    {
      type: 'paragraph',
      text: 'If you only remember one sentence: Git manages version history, and GitHub gives a team a place to collaborate around that history. Start with a local repository, push it to GitHub, and let the workflow — branch, commit, pull request, merge — grow naturally as the team does.',
    },
  ],
  related: [{ type: 'article', slug: 'git-workflow' }],
};
