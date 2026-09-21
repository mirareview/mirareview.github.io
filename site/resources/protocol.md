# Evaluation demonstration protocol

Source: the local human-evaluation study instructions and rating interface. The source seed configuration contains an older item-rating scale; this demonstration follows the current written protocol and interface (1–20), not that seed configuration. It does not establish which scale or participant counts were used in any manuscript result.

## Item-level judgment

Judge each musical requirement independently using integer ratings from 1 to 20:

- 1–4: clearly not satisfied, or contrary to the requirement.
- 5–8: mostly unsatisfied, with only a few relevant features.
- 9–12: partially satisfied, with important omissions.
- 13–16: mostly satisfied, with minor deviations.
- 17–20: clearly and fully satisfied.

Uncertain is a separate response for insufficient audible evidence, not a midpoint. Numeric ratings normalize to (rating − 1) / 19 for correlation with probabilistic evaluators. For strict binary analysis, 1–8 is negative, 13–20 is positive, and 9–12 and uncertain are excluded.

The practice track is a recorded MIRA output from the curated case collection. The interface retains the original 20-button scale and separate uncertain response. Precomputed automatic feedback is available in the Listening Gallery, where it is explicitly labeled; it is not presented as a real-time judgment in the rating form.

## System listening

Listen to four anonymous candidates from the same request. Rate each on explicit intent, completed intent, and overall alignment:

1. Clearly misaligned.
2. Very limited alignment.
3. Partially aligned, with substantial omissions.
4. Mostly aligned, with minor issues.
5. Very well aligned.

Select one or more best-aligned candidates. Multiple selections indicate a tie. Judge alignment with the requirements rather than audio quality or personal preference. Structure-related requirements may require listening to later parts of a clip.

The protocol describes averaging ratings within each request and system before averaging requests, and request-level bootstrap confidence intervals. This demonstration calculates no confidence intervals and creates no study records.

## Data handling

Ratings and rubric edits live only in page memory. Refreshing or leaving the page resets them. There is no login, analytics, storage, database connection, or inference service. Playing audio requests the selected file; downloading resources requests those files. Hosting-provider security logs are separate from this site's behavior.
