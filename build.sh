# cargo install mdbook

mdbook build

find book -name "*.html" | while read -r file; do
  perl -i -pe 'BEGIN{undef $/;} s/\n*<\/code>/<\/code>/smg' "$file"
done

# mdbook serve
