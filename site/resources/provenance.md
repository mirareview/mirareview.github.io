# Content and provenance

Status: author review, not a frozen submission release.

| Content | Source | Treatment |
| --- | --- | --- |
| Downloadable paper and human-assessment protocol | Author-supplied MIRA_FINAL.pdf, updated 26 September 2026 | Download is the exact supplied PDF. Evaluation protocol reproduces Appendix B and Table 6. |
| Main results | Author-supplied full MuRA-Bench table image, 21 September 2026 | 19 settings across refinement backends and direct API baselines; all 11 metrics transcribed at the supplied three-decimal precision. Includes YuE2-3B, Suno v6, Mureka V9.5, and StepAudio 3 Music. No aggregation recomputed. |
| Original component study | Author-supplied component table image, 21 September 2026 | Label remains “Original experiment” as supplied; backend identity awaits confirmation. The earlier manuscript describes a 25-request subset. |
| Yue3 components | Author-supplied component table image and earlier precise values | The superseded sixth row is excluded. Memory is one setting; experience summary disabled. No new SongGeneration2 component values are invented. |
| 100 requests and gold rubrics | Local full-100 evaluation snapshot | Stable public IDs replace private IDs. Three examples are presented in the original revision workflow; no full benchmark browser. Final release confirmation pending. No user logs or expert identities. |
| Seven ACE-Step v1.5 Turbo examples | Local curated cases export; backend identified as ACE-Step v1.5 Turbo by the author | Request text, recorded prompts, selected item scores, and actual audio roles preserved. Chinese editorial descriptions adapted into English with narrower causal claims. |
| Six additional trajectories | Author-selected export, 21 September 2026 | Three YuE2-3B and three SongGeneration2 Large cases. Parent / selected / root roles, prompts, all exported item scores and audio retained. Online MF scores only. Historical SongGeneration2 runs have item memory disabled; not the pending new memory experiment. |
| Evaluation instructions | MIRA_FINAL.pdf, Appendix B and Table 6 | 1–20 item ratings; uncertain excluded; 1–5 system ratings with ties. Study means give 100 requests equal weight; two-sided 95% Student-t intervals, 99 degrees of freedom. Demo behavior is documented separately. |
| Evaluation candidates | Four real outputs for one request outside the curated case set | A/B/C/D; system mapping is not distributed. |

## Audio

The ACE-Step v1.5 Turbo collection uses 16-bit PCM WAV. The new export includes float32 WAV and lossless FLAC. Source audio samples and precision are retained; local sanitized containers have ancillary metadata removed. MP3 previews use 320 kbps with no loudness normalization, trimming, or dynamic processing. MP3 compression is lossy and may alter perceptual details. Reported source scores refer to the original audio, not rescoring of MP3 previews. Waveforms are computed from the PCM samples.

Files are deduplicated by content. Identical audio retains its distinct case roles while sharing a resource. Only actual recorded nodes are exposed. The complete search tree and all rubric-item scores were not present in the export.

## Interpretation

Online verifier scores and offline gold-rubric scores use different requirements. They are not interchangeable. Tool examples are end-to-end comparisons; they do not establish a same-seed causal ablation. The selected examples are not a representative sample for estimating mean effects. Improvements, recorded regressions, and remaining online failure counts are all exposed.

## Release status

Benchmark release identity, aggregate result provenance, study version reconciliation, and the anonymous hosting identity still require author confirmation. This version deliberately retains an author-review banner. No public repository or research-code archive is linked until that material has been audited and frozen.

## Interface adaptation

Following author review, the project homepage uses the original MIRA overview and MuRA-Bench construction figures. The expert-revision demonstration ports the original task renderer and dimension-card helpers; the listening-study demonstration ports the original system/item renderers and completeness rules. Separate theme overrides match the project site. Bilingual sample fields come from the source snapshot. The site does not invent expert revision history. Reference evidence is a recorded local snapshot, and live search/translation/database calls are disabled.

## Additional case selection and media capacity

The gallery separates 3 YuE trajectories, 3 SongGeneration2 trajectories, 4 ACE-Step v1.5 Turbo comparisons, and 3 tool-grounding examples. New entries are curated demonstrations, not confirmed human-listening outcomes. The ambient SongGeneration2 root is only 3.64 seconds and is shown as a duration anomaly; the primary comparison uses the two 90-second parent and selected nodes. The game-music example is marked partial success and exposes regressed requirements. The 0.6 item cutoff in the new gallery is a browsing aid, not a human pass/fail annotation.

The gallery contains 13 cases, including the three tool-grounding examples restored at the author's request. There are 42 unique audio tracks including the evaluation demo: approximately 1,195 MB of originals and 195 MB of MP3 previews. The public website serves only 320 kbps MP3 for both playback and downloads. Original WAV/FLAC files are retained locally and are not published.

The downloadable manuscript is the author-supplied MIRA_FINAL.pdf, updated 26 September 2026. The human-assessment protocol follows its Appendix B and Table 6. The four homepage audio tabs illustrate ACE-Step v1.5 Turbo outputs; their scores belong to individual examples, not aggregate experiment results.

## Website abstract

The website abstract uses the full text supplied by the author, beginning “Text-to-music systems produce increasingly convincing audio”. Only PDF line wrapping and line-end word splits were removed. The downloadable PDF is the supplied MIRA_FINAL.pdf.
