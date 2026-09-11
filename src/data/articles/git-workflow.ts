import type { Article } from '@core/models/article.model';

export const GIT_WORKFLOW: Article = {
  slug: 'git-workflow',
  categoryKey: 'git',
  title: 'Git: the workflow I use to keep projects under control',
  excerpt:
    'What Git is, why version control matters, and the branch → commit → push → pull request workflow that keeps real projects on track.',
  readingMinutes: 10,
  year: '2026',
  datePublished: '2026-09-11',
  dateModified: '2026-09-11',
  seoTitle: 'Git Workflow: Branches, Commits and Pull Requests',
  seoDescription:
    'A practical introduction to Git, covering commits, branches, merges and a simple workflow for working on real software projects.',
  ogImage: '/images/blog/git-workflow/og.png',
  ogImageAlt: 'Git workflow — branches, commits and pull requests',
  intro:
    'Git becomes useful the moment a project involves more than one person — or even one person who wants to be able to undo last week and understand what changed. This note explains the fundamentals and the small workflow I use to keep projects under control.',
  blocks: [
    {
      type: 'heading',
      text: 'Why version control matters',
    },
    {
      type: 'paragraph',
      text: 'Before version control, sharing code usually meant copying folders, sending archives, and hoping nobody overwrote somebody else’s work. That falls apart quickly: two people edit the same file, one save silently destroys the other’s changes, and there is no way to answer the basic question “what changed, and why?”.',
    },
    {
      type: 'paragraph',
      text: 'Version control gives a project three things at once: a full history of every change, the ability to work on several things in parallel, and a safe way to go back when something breaks. Git is the tool that provides this, and it is how most real software projects are organized.',
    },
    {
      type: 'paragraph',
      text: 'A quick picture makes it concrete. Two people work on the same page: one saves a refactor, the other saves a bug fix. Without history, the last save silently replaces the other person’s work and nobody knows why. With Git, both changes live as separate commits, and any conflict is surfaced by the merge and resolved as a deliberate step instead of being lost.',
    },
    {
      type: 'heading',
      text: 'Repository, commit, branch',
    },
    {
      type: 'paragraph',
      text: 'Four words cover most of Git:',
    },
    {
      type: 'list',
      items: [
        'Repository — a folder plus the complete history of everything in it. Initialize one with git init.',
        'Commit — a snapshot of the project at a moment, saved with a message. The history is just a chain of commits.',
        'Branch — a separate line of work. You can experiment without touching the main line, then decide later whether to bring it back.',
        'Merge — the operation that brings one branch’s changes back into another.',
      ],
    },
    {
      type: 'paragraph',
      text: 'There is also .gitignore, a small file that tells Git which files never belong in the repository — build output, dependencies, environment files with secrets. Keeping those out is as important as making good commits.',
    },
    {
      type: 'heading',
      text: 'The everyday workflow',
    },
    {
      type: 'paragraph',
      text: 'In the team projects I work on, almost every task follows the same loop: create a branch, make changes, commit, push, open a pull request, get it reviewed, merge. It sounds verbose, but it keeps the main branch stable and every change reviewable.',
    },
    {
      type: 'code',
      title: 'The workflow',
      language: 'text',
      body: 'Create a branch\n    ↓\nMake changes\n    ↓\ngit add\n    ↓\ngit commit\n    ↓\ngit push\n    ↓\nPull Request\n    ↓\nReview / Merge',
    },
    {
      type: 'paragraph',
      text: 'In commands, one round looks like this:',
    },
    {
      type: 'code',
      title: 'One iteration',
      language: 'bash',
      body: 'git checkout -b feature/login\ngit add src/login.ts\ngit commit -m "Validate email before submitting"\ngit push origin feature/login',
    },
    {
      type: 'paragraph',
      text: 'git add chooses which changes go into the next commit, git commit saves them with a message, and git push publishes the branch so others can see it. Each step is explicit — nothing happens by accident.',
    },
    {
      type: 'heading',
      text: 'Reading the state of your repository',
    },
    {
      type: 'paragraph',
      text: 'Three commands cover most of “where am I and what’s going on”:',
    },
    {
      type: 'list',
      items: [
        'git status — shows which files changed, what is staged for the next commit, and the current branch.',
        'git diff — shows the exact lines that changed since the last commit.',
        'git log --oneline — prints the recent history, one commit per line.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Together they answer where you are, what you changed, and what the history looks like at any moment. They cost nothing and keep confusion away in a shared repository.',
    },
    {
      type: 'heading',
      text: 'Pull, push and pull requests',
    },
    {
      type: 'paragraph',
      text: 'git pull brings the latest commits from the shared repository into yours; git push sends your commits to that shared repository. Between the two, a pull request (PR) is a proposed merge: “I finished this branch, please review it.” The PR is where the code review happens — people comment on lines, ask for changes, and approve before anything lands on the main branch.',
    },
    {
      type: 'heading',
      text: 'Why meaningful commits matter',
    },
    {
      type: 'paragraph',
      text: 'A commit message is a message to your future self and your teammates. “fix stuff” is useless one month later; “validate email before submitting” says exactly what changed and why. Good messages also make the history searchable and make git bisect — finding which commit broke something — far more effective.',
    },
    {
      type: 'heading',
      text: 'When something goes wrong',
    },
    {
      type: 'paragraph',
      text: 'Git’s scary reputation mostly comes from feeling stuck in a state you don’t recognize. In practice, the common cases are small:',
    },
    {
      type: 'list',
      items: [
        'git restore <file> discards uncommitted changes to a file.',
        'git revert <commit> adds a new commit that undoes a previous one — the safe way to back out of history that has already been pushed.',
        'git log --oneline --graph shows branches in the history, which settles most “where did that even come from?” questions.',
      ],
    },
    {
      type: 'paragraph',
      text: 'git commit --amend is fine while a branch is still yours; once it is shared, prefer a new commit instead. And the truly scary cases are rarely fatal — git reflog keeps a local diary of where HEAD used to be, which is the safety net people usually fall back on.',
    },
    {
      type: 'heading',
      text: 'Common mistakes beginners make',
    },
    {
      type: 'list',
      items: [
        'Committing secrets — keys, passwords, .env files. If it has ever been pushed, rotate it and remove it from history.',
        'Committing build artifacts such as node_modules, target, or dist. Add them to .gitignore from day one.',
        'Huge, unclear commits that mix five unrelated changes.',
        'Pushing directly to main instead of working on a branch.',
        'Force-pushing branches other people have based their work on.',
        'Not pulling before pushing, and then fighting merge conflicts that a two-second pull would have avoided.',
      ],
    },
    {
      type: 'heading',
      text: 'Wrapping up',
    },
    {
      type: 'paragraph',
      text: 'Back to the original question: how does Git actually help when you are building a real project with other people? It keeps a shared, searchable history. It lets everyone work in parallel on branches without stepping on each other. And it makes every change reviewable and reversible, which means the team can move faster because breaking something is no longer the end of the world.',
    },
  ],
  related: [{ type: 'article', slug: 'git-and-github' }],
};
