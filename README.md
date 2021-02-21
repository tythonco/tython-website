# Tython Blog

## Instructions for Creating a New Post

1. Write content as a child page under 'Drafts' within internal Confluence space

2. Upon publish approval, export content to HTML (Space Settings > Content Tools > Export > HTML > Custom Export)

3. Unzip download && clone [this repo](https://github.com/tythonco/confluence-to-markdown) locally

4. Follow the `confluence-to-markdown` instructions to convert the exported files to markdown format

5. Checkout the `gh-pages` branch of this repo and add the newly created files, this is an orphan branch so be careful *not* to pull in any unnecessary source

6. To test updates locally *temporarily* clear the `relative_url` and `baseurl` values within `_config.yml` and then run `bundle update && bundle exec jekyll serve`

7. When ready, be sure `relative_url` and `baseurl` are reverted to their original values, commit your changes, and push to the `gh_pages` remote branch

8. Verify your new post is available online :tada:

## Resources

[Confluence to Markdown](https://github.com/tythonco/confluence-to-markdown)

[Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/github/working-with-github-pages/testing-your-github-pages-site-locally-with-jekyll)