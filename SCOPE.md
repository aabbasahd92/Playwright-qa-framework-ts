# Scope Statement: What This Project Honestly Demonstrates

This document exists so this project gets described accurately on a resume,
in a cover letter, or in an interview — the same accuracy standard applied to
every other claim in your resume work (Playwright depth vs. Selenium/Cypress
exposure-only, GCP consumption vs. infrastructure provisioning, etc.).

## What this genuinely demonstrates

- **Current, working TypeScript syntax and type-checking discipline.** The
  project uses `strict: true` in `tsconfig.json` — the strictest common TS
  setting — and compiles cleanly under it. You can point to specific files
  and explain every construct in them.
- **Fluency with the Playwright Test runner's TypeScript-native idioms**:
  fixture extension (`test.extend<Fixtures>`), typed Page Object classes,
  `Locator` typing, async/await patterns, project-based multi-browser config.
  This is not "Python knowledge with TS syntax pasted on" — the fixture
  architecture in particular required understanding how Playwright Test's
  own dependency-injection model differs from pytest's, and choosing the
  idiomatic TS-side equivalent rather than transliterating.
- **Direct transfer of real automation engineering skill**: the Page Object
  Model design, the REST API CRUD test structure, and the `route()`
  interception / service virtualization patterns are the same skills you've
  built and demonstrated in the Python framework — re-expressed in a second
  language, not learned from scratch. This is a legitimate way to describe
  the port: "I ported my existing framework's architecture and test logic to
  TypeScript," not "I learned TypeScript automation from zero."
- **A real, CI-integrated project you can run, extend, and discuss under
  technical questioning.** This is not a copy-pasted tutorial; every test was
  ported from a specific, named file in your own working Python repo, and you
  can explain why each one was selected as representative.

## What this does NOT demonstrate

- **Years of production TypeScript depth.** There is a real difference between
  "I can write correct, idiomatic TypeScript in a well-scoped test framework"
  and "I have years of experience in a TypeScript production codebase" —
  the latter involves things this project doesn't touch: complex type
  hierarchies and generics under real business logic, a build system with
  bundlers/transpilers beyond `tsc`, integrating TS into a larger existing
  codebase with legacy JS, dependency and version conflict resolution across
  a large `package.json`, or debugging TypeScript's type inference in
  genuinely gnarly edge cases. Don't claim the latter based on this project.
- **Original framework design work in TypeScript.** The architecture (POM
  structure, fixture design, what to test) was already decided in the Python
  original. Porting it faithfully to TS is real, legitimate engineering work —
  but it is not the same claim as "I designed this test architecture in
  TypeScript from a blank slate," which you have not done here.
- **Battle-tested TS-specific debugging experience.** You have not yet hit and
  resolved the kind of gnarly, only-shows-up-in-TypeScript issues (type
  narrowing failures, declaration file mismatches, `tsconfig` conflicts across
  a monorepo) that come from sustained production use. That's a gap, and it's
  fine to name it as "next thing I'm building toward" rather than skip past it.
- **A verified live test run in this exact delivery.** See the "Known
  limitation" section in `README.md` — the sandbox that built this had no
  route to the live target sites, so the honest claim is "compiles cleanly,
  discovered correctly by the test runner, faithfully ported line-by-line
  from tests that pass in the working Python suite" — not "I ran this and
  watched it go green." Run it on your own machine before an interview so you
  can speak to an actual pass/fail result, not just a compile check.

