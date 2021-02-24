# Tython Site

## Testing New Content

To test updates locally run `npm test` from the `gh-pages` branch and open http://localhost:4000


## Blog Posts

### Instructions for Creating a New Draft Post

#### Via Markdown

1. Checkout a new branch based on the `gh-pages` branch of this repo

2. Write content in markdown under a `_drafts` folder until completed

#### Via Confluence

1. Write content as a child page under 'Drafts' within internal Confluence space

2. Once your draft is completed create a child page under 'Posts' and copy over just the blog content from your draft

3. Export your post content to HTML (Space Settings > Content Tools > Export > HTML > Custom Export)

4. Checkout a new branch based on the `gh-pages` branch of this repo and run `npm install`

5. Unzip download and copy the resulting `TI` folder to the root directory

6. Convert the exported HTML files to Markdown by running `npm start`, the converted files will be placed in the `out` folder

### Converting a Draft to a New Post

1. Move the draft file to a new or pre-existing `_posts` folder, using the folder hierarchy to categorize based on content

2. Move any other static files referenced by your post as needed

3. Be sure to add all necessary frontmatter to the new post


## Publishing New Content

1. Commit local changes and open a PR against `gh-pages`

2. After the PR has been merged, verify you can view the new content online :tada:


## Resources

[Confluence to Markdown](https://github.com/tythonco/confluence-to-markdown)

[Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/github/working-with-github-pages/testing-your-github-pages-site-locally-with-jekyll)