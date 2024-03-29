# Tython Site

## Setup

1. [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/)

2. [Install Bundler & Jekyll](https://jekyllrb.com/docs/installation/)

3. Run `npm install` and then `bundle install` to bring in all other dependencies

## Creating New Content

### Instructions for Creating a New Draft Post

#### Via Markdown

1. Checkout a new branch

2. `npm run draft "My New Post"`

3. Fill out all frontmatter details, setting `date` to the expected publication date

#### Via Confluence

1. Write content as a child page under 'Drafts' within internal Confluence space

2. Once your draft is completed create a child page under 'Posts' and copy over just the blog content from your draft

3. Export your post content to HTML (Space Settings > Content Tools > Export > HTML > Custom Export)

4. Checkout a new branch and run `npm install`

5. Unzip download and copy the resulting `TI` folder to the root directory

6. Convert the exported HTML files to Markdown by running `npm start`, the converted files will be placed in the `out` folder

### Sharing Example Code

1. Within `examples` create a new folder named after your new post's slug

2. Drop all related example code and files into the new folder

3. Link to this folder from your post with the following syntax `[link]({{ site.examples_url }}{{ page.slug }})`

## Testing New Content

1. Run `npm test` to open http://localhost:4000 where the site will be hosted locally with livereload enabled

## Publishing New Content

1. Commit local changes and open a PR

2. After the PR has been merged, our scheduled
[Github Action](https://github.com/soywiz/github-action-jekyll-publish-drafts)
should auto-publish the post once the publication date has been reached

3. Verify you can view the new content online after the publication date :tada:

## Resources

[Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/github/working-with-github-pages/testing-your-github-pages-site-locally-with-jekyll)

[Jekyll CheatSheet](https://devhints.io/jekyll)

[Confluence to Markdown](https://github.com/tythonco/confluence-to-markdown)

[GitHub Emoji Markdown CheatSheet](https://gist.github.com/rxaviers/7360908)