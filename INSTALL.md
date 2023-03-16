
# Installing Ruby from source

To use Just The Docs you need a newer version of Ruby than the regular
GitHub Pages themes, which is not included in the Debian repos. You can either
use a Ruby manager like RVM (which is great if you need more than one version),
or compile from source if you like the newest version globally available.
The latter is a bit tricky, so here is a complete guide.

## Installing dependencies

The following Debian packages are needed:

    $ sudo apt install libtool libffi7 libffi-dev libreadline8 libreadline-dev

You also need libyaml which is not in Debian:

    $ git clone git@github.com:yaml/libyaml.git
    $ cd libyaml/
    $ ./bootstrap
    $ ./configure
    $ make
    $ make test
    $ sudo make install

## Compiling Ruby

Download the source from [here](https://www.ruby-lang.org/en/downloads/), then compile:

    $ tar xfz ~/Downloads/ruby-3.2.1.tar.gz
    $ cd ruby-3.2.1/
    $ ./configure
    $ make
    $ make test
    $ sudo make install

This will install Ruby globally in /usr/local.

## Setting up your environment

While installing Ruby globally is acceptable, installing Rubygems as root is
frowned upon. Instead you should install them on your local user area, e.g.
in `.gems`:

    $ mkdir ~/.gems
    $ cat > .bashrc
    export GEM_HOME=$HOME/.gems
    export PATH=$HOME/.gems/bin:$PATH
    ^D
    $ exec bash

Now you should be able to install Jekyll so it is available everywhere when you are logged in:

    $ gem install bundler jekyll

