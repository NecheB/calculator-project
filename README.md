# LeadPredictor

A campaign funnel calculator inspired by the supplied reference. Built with plain HTML, CSS and JavaScript.

**Live demo (Netlify): [https://necheb-leadpredictor.netlify.app/](https://necheb-leadpredictor.netlify.app/)**

## Run locally

This optional section is for running the calculator on your own computer. To use the published app without any setup, open the [live Netlify site](https://necheb-leadpredictor.netlify.app/).

Local development requires Node.js 22 or newer. There are no runtime or build dependencies. Clone or download this repository, open a terminal in the project folder, and start the development server:

```sh
npm run dev
```

While the server is running, open [http://localhost:5173](http://localhost:5173) in your browser. This address works only on your own computer; it is not the public deployment.

To run the tests or create a production build:

```sh
npm test
npm run build
```

The build copies the static application into `dist/`.

## Formulas

- Customers = revenue / average order value
- Leads = customers × 100 / lead response rate
- Prospects = leads × 100 / prospect response rate

The default example gives **10 customers, 25 leads and 125 prospects**.
Calculations retain full precision; displayed figures use up to two decimal places and represent expected values rather than rounded staffing quotas.
Card percentages are relative to the total prospects: 100%, 20%, and 8% in the example.

The chart assumes uniform progress over the campaign, showing up to six cumulative milestones. Dates include both the start and end day. Tooltips are available by hover, keyboard focus, or tapping a bar. Invalid inputs hide the forecast and show a validation message. Campaigns may span up to 3,660 days.

English and Bulgarian are supported. Currency selection changes the denomination label only; it does not convert amounts using exchange rates.

## Deployment

The calculator is deployed publicly at **[LeadPredictor on Netlify](https://necheb-leadpredictor.netlify.app/)**.

Netlify uses `npm run build` and publishes `dist/`, configured in `netlify.toml`.
GitHub Actions runs tests and the build on pushes and pull requests.

## GitHub history

Following an initial repository bootstrap commit, all implementation changes are merged through pull requests. Feature branches are retained as evidence of the workflow.

1. `feat/calculator-layout`: responsive reference-inspired layout.
2. `feat/funnel-engine`: formulas, validation, and unit tests.
3. `feat/interactive-forecast`: cumulative graph and accessible tooltips.
4. `feat/localization`: Bulgarian translations and currency display.
5. `feat/netlify-release`: build, local server, CI and Netlify configuration.

The history also includes an optional preference-persistence feature and its explicit `git revert`, both reviewed through pull requests. The final calculator opens with the reproducible reference inputs.
