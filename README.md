# Recommendations Project

A responsive article-recommendation widget for content-delivery purposes. 

Focusing on TDD, I used the following technologies: HTML, CSS, JavaScript, Jest, Puppeteer, and ESLint. 

*Other than for testing purposes, no external libraries have been used.* 

## Deliverables

I created a responsive widget that renders article recommendations from an API call. The widget displays as a 3x2 grid on tablet and desktop, and as a 1x6 grid on mobile devices. 

Each recommendation (via response JSON) includes: Image, Title, Sponsor, and Article Category. The included content is clickable and redirects to the article source.

Further, the user's browser language is detected, and the Header is reset based on the user's preferred language (e.g., from `'en-US'` to `fr`, etc.). See the `detectLanguage()` method in `scripts.js` for more information. 

As a final bonus, the title only takes up three lines if it is too long, based on responsiveness. Should the title exceed three lines, an ellipsis is implemented.

## Getting Started

These instructions will get you a copy of the project up and running on your local maching for dev and testing purposes.

### Installing 

Fork and clone this repo, then `cd` into the folder. Run `npm install` to add the correct Node modules. 

### Running the Tests

The tests are best run in VS Code though basic terminal usage works just fine. 

A server-run version is currently in the testing profile, so use the `http-server` Node package for ease-of-access. The tests default to `PORT 8080` but this can be changed by running (in terminal) `http-server -p <PORT>`. Then, simply changed the `APP` address in `index.test.js`.

Once the server is running, simply run `npm test`. 

## Author

* [Richard Scheiwe](http://richardscheiwe.com)
