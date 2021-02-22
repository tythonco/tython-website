# Tython Blog

## Instructions for Creating a New Post

1. Write content as a child page under 'Drafts' within internal Confluence space

2. Upon publish approval, export content to HTML (Space Settings > Content Tools > Export > HTML > Custom Export)

3. Checkout the `gh-pages` branch of this repo and run `npm install`

4. Unzip download and copy the resulting `TI` folder to the root directory

5. Convert the exported HTML files to Markdown by running `npm start`

6. Ensure any new post file names are in lowercase

7. Add the related folders/files for any new posts to the root directory

8. To test updates locally run `npm test` and open http://localhost:4000/blog

9. When ready, commit your changes and push to the `gh-pages` remote branch

10. Verify you can view the new post(s) online :tada:

## Resources

[Confluence to Markdown](https://github.com/tythonco/confluence-to-markdown)

[Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/github/working-with-github-pages/testing-your-github-pages-site-locally-with-jekyll)