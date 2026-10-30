---
title: My model beat the rule by one case in fifty, and I can defend that
date: 2026-10-27
summary: At the same number of patients called, a stroke model found about two more cases per forty than the rule it replaces, and a sealed test of fifty could only say it points the same way.
tags: machine-learning, process
---

On the 50 strokes in my sealed test set, my model found 40. The rule it is meant to replace found 39, calling the same number of patients. The 95% interval on that difference runs from 0 to 4, so the test alone cannot say the model is ahead. I'm reporting it anyway. A win that small is easy to bury and easy to inflate.

This is a project for my applied machine learning course, on the public Stroke Prediction Dataset, with a hypothetical insurer that can call only some of its members each month. It is not a clinical tool. The label records who already had a stroke; it can't say who will. The insurer's rule is age 60 or over, or hypertension. It calls 30.8% of patients and catches 78% of the strokes.

## Measure at the rule's own budget

The rule is the opponent and the patients it calls are the budget. Every model gets scored at that budget: rank patients by risk score, call as many as the rule called, count the strokes found beyond the rule's.

Nested cross-validation on the training 80% gives 20 evaluations of about 817 patients and 40 strokes each. An inner loop picks each model's settings, and an outer loop scores it on patients that took no part in that choice. Twenty evaluations let me see the noise instead of guessing at it.

Logistic regression found 1.75 more cases per evaluation than the rule, with a standard deviation of 1.55. It was ahead in 15 of the 20, level in 4 and behind in 1.

## Three criteria picked three models

Five candidates went through it: two logistic regressions, kNN, random forest and gradient boosting. PR-AUC, the metric I used to tune settings, ranks gradient boosting first. At the rule's budget that model found 1.30 extra cases, fourth of the five, with a spread of 2.62. Extra cases rank random forest first, at 2.40 ± 1.67.

[The last post](/blog/accuracy-hides-the-minority) ended on a guess that tree ensembles would find interactions a linear model misses. The data did not back it. Random forest led logistic regression by 0.65 cases, ahead in 12 of the 20 evaluations and behind in 6, against a spread of 1.67 between evaluations. I can't tell that from luck, and the other ensemble trailed.

Before the final run I had written down what to do about that: any model within one standard deviation of the best gives way to the simplest. All but kNN fell inside the line, so logistic regression won, and it can be read one coefficient at a time. That is a procedure, not a claim that the models are equal: random forest may really be a little better.

## The sealed test only points the same way

I sealed 20% of the patients before looking at anything else: 1022, of whom 50 had a stroke. I fixed the model, the settings and the cut-off for calling patients without them. Then I opened the test once.

The 40 against 39 has an interval of 0 to 4, from 1000 bootstrap resamples of the test set. With 50 cases a single case moves recall by two points, so the test can point but not prove. It points the same way as the 20 evaluations, and that is all it says.

Its main job was to stop me. A test set I had used to pick a model would be one more validation set, and I would have no honest number left.

## The objection: one case in fifty is nothing

A gain that small isn't worth reporting, the objection goes, and a bigger model would earn a bigger number.

The size is the finding. I would rather publish +1 with an interval of 0 to 4 than a headline resting on one lucky split. And +1 is not nothing in the insurer's unit: at the cut-off I fixed, 0.504, the model reached recall 0.80 out of fold calling 28.5% of patients, where the rule calls 30.8% to reach 0.78. The rule already holds age, which is 63% of the model's weight (mean absolute SHAP), so a small win is what to expect. Between 18 and 59 the model catches 0.35 of cases to the rule's 0.22, and two in three still slip through.

As for bigger models, I did run them: the best led by 0.65 cases and gradient boosting did worse. A neural network I did not train, so this is reasoning, not a measurement: a small one with 22 inputs and 16 hidden units has about 385 parameters, against 199 strokes to learn them from. Logistic regression has 22.

## A template for the claim

I write any claim that a model beats a rule in this shape. A blank I can't fill means it isn't ready.

```text
Budget: the rule contacts __% of people; the model is scored at the same __%.
Repeated runs (__ of about __ positives): __ more cases than the rule, spread __, ahead in __ of __.
Sealed test, opened once (__ positives): model __, rule __, difference __ (95% interval __ to __).
Tie-break among close models, fixed before the final run: __.
What the label records: __.
```

Mine reads 1.75 more cases per 40, ahead in 15 of 20, and 40 against 39 on the sealed test.
