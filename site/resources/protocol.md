# Human assessment and evaluator agreement

Source: [MIRA_FINAL.pdf](paper.pdf), Appendix B, including Table 6. The study protocol below reproduces the manuscript's protocol; equations are written in plain text for web accessibility.

Three music experts completed two human-assessment tasks: judging individual rubric requirements and rating intent alignment across generated candidates. For both tasks, assignments were divided approximately equally among the experts without overlapping assignments, and each expert independently assessed their assigned samples. Experts received common task and scoring instructions before annotation. They were instructed to listen to each clip in full before rating and were allowed to replay it. System identities and automatic scores were hidden in the annotation interface. Ratings concerned fulfillment of the request rather than personal musical preference.

## Rating anchors (Table 6)

The item-level task uses a 20-point scale, and the system-level task uses a five-point scale. For the 20-point scale, experts distinguish degrees of fulfillment within each range. The two assessment tasks are scored separately using their respective scales.

| 20-point | 5-point | Interpretation |
| --- | --- | --- |
| 1–4 | 1 | Not fulfilled: the required property is absent or clearly contradicted. |
| 5–8 | 2 | Slightly fulfilled: only weak evidence is audible, with most of the requirement unmet. |
| 9–12 | 3 | Partially fulfilled: recognizable evidence is present, but substantial shortcomings remain. |
| 13–16 | 4 | Mostly fulfilled: the main requirement is realized, with minor shortcomings. |
| 17–20 | 5 | Fully fulfilled: the requirement is clearly and sufficiently realized, without an evident deviation. |

## B.1 Rubric-level annotation

For item-level assessment, the interface presents an audio clip and its rubric requirements. The instructions ask evaluators to judge whether the audible content meets each requirement, rather than whether they like the music. Experts use a 20-point scale for item-level assessment. For an integer rating r ∈ {1, …, 20}, the normalized score is:

    h = (r − 1) / 19.

Uncertain responses are excluded from numerical analysis.

The agreement study in Table 1 uses 1,536 clip–item ratings from 100 clips and 25 requests, with one expert rating per target.

## B.2 Matching automatic scores to human targets

Each evaluator is matched to human targets by clip and rubric-item identifiers. All evaluation methods in Table 1 use the same 1,536 clip–item targets from 100 clips and 25 requests. Item-level Spearman correlation and Kendall's τb use these matched pairs. Clip-level scores average the matched rubric items within each clip for both the automatic and human scores, then compute Pearson correlation, Spearman correlation, and Kendall's τb across clips.

### Pairwise accuracy

We compare unordered pairs of clips generated for the same request, using their clip-level mean scores. Pairs tied under the human score are excluded. A pair counts as correct only when the automatic score orders the clips in the same direction as the human score; an automatic tie on a human-nontied pair counts as incorrect. Differences below 10^−12 in magnitude are treated as ties. The 25 requests provide 150 candidate pairs before excluding three human ties, leaving 147 comparisons. These comparisons share clips and should not be interpreted as 147 independent requests.

## B.3 System-level listening interface

The system-level listening study covers all 100 MuRA-Bench requests and 400 audio clips, with four clips per request: direct ACE-Step, ACE-Step with MIRA (B = 9), MiniMax music-3.0, and Suno v5.5. The listening task presents the four candidates labeled A–D together with the request and its intent criteria. Candidate order is stably shuffled for each evaluator–request combination, so reloading a task preserves its presentation order. The annotation interface uses anonymous candidate labels and audio endpoints, without showing generation-system names or automatic evaluator scores.

The listening form asks evaluators to rate explicit, inferred, and overall intent on a five-point scale. The instructions focus on fulfillment of the request rather than overall music quality. The interface also allows tied best-candidate selections. We aggregate ratings separately for overall, explicit, and inferred intent to obtain the system-level results in Figure 3.

Explicit intent concerns requirements stated directly by the user. Inferred intent concerns supplementary requirements derived from references and context in the request. Overall intent is rated independently as a holistic judgment of whether the music achieves the user's intended outcome.

### Aggregation and uncertainty

Each clip receives one expert rating for each intent dimension. For each system and dimension, we compute the arithmetic mean of the 100 ratings, giving each request equal weight. Let y₁, …, yN denote these ratings, with N = 100. The mean and sample standard deviation are:

    mean = (1 / N) × Σᵢ yᵢ
    s = sqrt(Σᵢ (yᵢ − mean)² / (N − 1)).

The error bars show two-sided 95% Student-t confidence intervals:

    [mean − t(0.975, 99) × s / sqrt(100),
     mean + t(0.975, 99) × s / sqrt(100)].

These intervals summarize variation across rated requests; they do not measure inter-rater reliability.

---

## Website demonstration (not part of the study protocol)

The public interface is a practice demonstration, not the study annotation service. Ratings and rubric edits live only in page memory and reset on leaving or refreshing the page. It does not collect study records, compute confidence intervals, or connect to a login, database, or inference service. Demonstration candidates retain their supplied anonymous order; the demo has no evaluator accounts or study assignment mechanism. The item practice track is a recorded output from the curated collection. Precomputed automatic feedback is shown separately in the Listening Gallery, not in the rating form. Playing audio and downloading resources request those files; hosting-provider security logs are separate from the demonstration.
