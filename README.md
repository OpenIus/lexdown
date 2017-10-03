# lexdown

Lexdown is a markup language for legal documents.


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

### Lexrefs

```
*[<title>](<ELI/ECLI code>)
```

## Examples

There are a few example documents in `examples/`. To compile those to html just
run `bin/parser.js <filename> > test.html`.
