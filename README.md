# lexdown

Lexdown is a markup language for legal documents.


## Usage

- Install NodeJS
- run `./scripts/install.sh`
- Parse lexdown files as done in `./scripts/usage.sh`


## Syntax

### Basic markdown syntax

Lexdown builds on the GFM markdown syntax and therefore supports (nearly) all of
the syntax defined [here](https://github.github.com/gfm/).

### Footnotes

### Marginalia

Marginalia can be defined for `cod` documents on an article level:

```
### Article title

[[This is a marginalia]]

Article text...
```

### Superscript & Subscript

```
^1^Superscript
~2~Subscript
```

### Lexrefs

```
*[<title>](<canonical>)
```

If the title is not supplied we'll just display the title of the article itself.

The canonical has the following format:

```
/ch/[cod|rul]/<srNumber>/<article>
```

Example: `/ch/cod/220/66` for the art. 66 of the OR.

## Examples

There are a few example documents in `examples/`. To compile those to html just
run `bin/parser.js <filename> > test.html`.
