# Chief AI Officer Learning Path

A self-paced 26-week course for experienced technical leaders moving toward Chief AI Officer / Head of AI roles.

## What it includes

- 11 sequenced modules across technical fluency, AI evaluation and assurance, AI strategy, data/platform, governance, security, economics, operating model, executive leadership, and a capstone.
- Section summaries and reusable review pages.
- 39 original lessons, each with concept and application sub-lessons, examples, and practice prompts.
- Stable IDs: `m1` through `m11` for modules, `m1.1` for lessons, and `m1.1.1` for sub-lessons.
- Light and dark appearance modes with a fixed switch and saved preference.
- Original illustrations and explanatory diagrams, including illustrative charts labelled as examples.
- Progress tracking stored locally in the browser with `localStorage`.
- Quizzes and applied homework.
- Curated links to current primary/reference material.
- Canadian and EU privacy, AI governance, and security considerations alongside US material.
- Responsive static site suitable for GitHub Pages.

## Run locally

Serve the folder with a local HTTP server. Course material loads from JSON files, so opening `index.html` as a local file will not work.

Example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Course files

- `course/catalog.json`: lightweight module and lesson listing for navigation and progress.
- `course/modules/mN/module.json`: module introduction, lesson summaries, quiz, homework, diagrams, and references.
- `course/modules/mN/lessons/L.json`: one lesson's teaching content, with sub-lesson IDs.
- `course/references.json`: the course-wide reference library.
- `course/id-migration.json`: one-time mapping for progress saved under earlier IDs.

You can edit one lesson file independently. The app fetches module and lesson JSON on navigation without reloading the page; edits appear on the next visit to that module or lesson. Keep the catalog and module listing in sync when adding, removing, or renaming lessons. Check the structure with `node --test tests/course.test.cjs`.

## GitHub Pages and branch flow

The Pages workflow publishes two paths from this repository:

- Production: https://novydhillon.github.io/caio-learning-path/ from `main`.
- Test: https://novydhillon.github.io/caio-learning-path/dev/ from `dev`.

Create changes on a feature branch, merge them into `dev`, and review the test site. Merge `dev` into `main` only after approval. Pushes to either branch refresh both paths: the production path is always assembled from `main`, and the test path is always assembled from `dev`. Progress is stored separately for each path in the same browser.

In **Settings → Pages**, set **Source** to **GitHub Actions**. The site is build-free: HTML, CSS, JavaScript, and JSON.

## Progress data

Progress is stored in the browser under `caio-learning-progress-v1`. It is device/browser specific. Clearing browser storage resets progress.

## Curriculum design

The course uses:

- Explicit learning objectives
- Chunked lessons
- Retrieval practice via quizzes
- Applied artifacts instead of passive reading
- Cumulative practice leading to a capstone
- Suggested spaced review at 1 week, 1 month, and 3 months
- Interleaving of strategy, technology, governance, economics, and leadership

## Suggested pacing

Plan for 5–7 hours/week over 26 weeks. An experienced technical executive can compress the early technical sections and invest additional time in governance, economics, organizational transformation, and board communication.
