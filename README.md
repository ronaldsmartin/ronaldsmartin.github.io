# itsronald.com

Source for my blog. Now built with [Hugo](https://gohugo.io/).

This branch contains the source used to generate static site hosted on the master branch.

### Run locally

    $ brew install hugo
    $ git clone https://github.com/ronaldsmartin/ronaldsmartin.github.io.git
    $ cd ronaldsmartin.github.io
    $ git checkout hugo-site
    $ hugo server
  
The site will then run on `localhost:1313`, rebuilding automatically on source changes.

### Build and deploy

This currently uses X1011's [git-directory-deploy](https://github.com/X1011/git-directory-deploy) script.

**On the `hugo-site` branch:**

    $ ./deploy.sh
  
The script has been modified to build the site to the default `public/` directory, publish the generated files, and then remove `public/` to clean up.

## Credits

* [Hugo static site generator](https://github.com/spf13/hugo) by spf13
* [hugo-future-imperfect theme](https://github.com/jpescador/hugo-future-imperfect) by jpescador

## License

Licensed under [GPL v2.0](https://github.com/ronaldsmartin/ronaldsmartin.github.io/blob/hugo-site/static/LICENSE).
