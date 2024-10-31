const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');

// Define the pattern to search for .mdx files
const pattern = path.join(__dirname, '..', '**', '*.mdx');

describe('MDX Metadata Validation', () => {
    const files = glob.sync(pattern);

    files.forEach((file) => {
        test(`${file} should have valid metadata`, () => {
            const content = fs.readFileSync(file, 'utf8');
            const { data } = matter(content);

            // Check for required metadata fields
            expect(data).toHaveProperty('author');
            expect(data).toHaveProperty('title');
            expect(data).toHaveProperty('tags');
            expect(data).toHaveProperty('description');
        });
    });
});
