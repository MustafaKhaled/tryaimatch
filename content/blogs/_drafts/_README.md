# Draft outlines

This folder holds **brief outlines** for upcoming blog posts. They are NOT published
(the `_` prefix is excluded from the public `blogs` collection by content.config.ts
if you wire that filter, otherwise: rename a draft to remove the `_drafts/` path
and it'll appear in /blogs).

Each outline follows the same structure:

1. **Target keyword** — the primary query we want to rank for
2. **Secondary keywords** — related queries the post should naturally cover
3. **Search intent** — what the searcher actually wants
4. **Word count target** — based on top-ranking SERP averages
5. **H1 / H2 outline** — the structural skeleton
6. **Internal links** — pages on tryaimatch.com this post should link to
7. **CTA placement** — where to put quiz callouts
8. **FAQ section** — 4-6 questions to add (with schema.org Q&A markup for rich snippets)
9. **Methodology callout** — every pillar post should reference the scoring system

## How to write from these outlines

- **Voice**: match the homepage tone — direct, conversational, no jargon, opinionated where it counts. "We built X because Y," not "industry-leading solutions."
- **Length**: hit the target word count ±10%. Below the target risks ranking lower; way above risks padding.
- **First paragraph**: directly answer the search query in the first 60 words. Google's featured snippet algorithm prefers fast answers.
- **Headings**: use the exact keyword in H1 and at least one H2. Don't force it unnaturally.
- **Authority signals**: cite specific numbers from your scoring engine. "HeyGen scores 10/10 for talking-head avatars because..." reads as expertise.
- **Avoid**: sponsored-feel language, vague superlatives ("revolutionary"), keyword stuffing, AI-detector clichés ("In today's fast-paced world...").

## Publishing checklist

For each finished post:

- [ ] Frontmatter complete (title, description, publishedAt, author)
- [ ] Description under 160 chars (meta description)
- [ ] Title under 60 chars (title tag)
- [ ] Primary keyword in title, H1, first paragraph, URL slug
- [ ] At least 3 internal links (related posts + quiz)
- [ ] At least 2 outbound links to authoritative sources (tool homepages, docs)
- [ ] FAQ block at the bottom
- [ ] Move file from `_drafts/` to `content/blogs/`
- [ ] Submit `/sitemap.xml` ping to Google after publishing
