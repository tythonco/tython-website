# Blog

## Available Pages:

{% for post in site.posts %}
-   [{{ post.title }}]({{ post.url }})
{% endfor %}