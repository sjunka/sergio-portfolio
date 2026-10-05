---
title: A stroke model with 95% accuracy that finds nobody
date: 2026-10-01
summary: On a dataset where fewer than 5% of patients had a stroke, accuracy rewards the model that detects no one, and the metric that matters is how many patients you call per case you catch.
tags: machine-learning, process
---

Take 5109 patients, of whom 249 had a stroke. That's 4.87%. Now build the laziest classifier possible: answer "no stroke" for everybody. It scores 95.1% accuracy, and it would never send a single person to a prevention programme.

I didn't invent this as a thought experiment. That number came out of my own baseline run on the public Stroke Prediction Dataset from Kaggle, for a project in my applied machine learning course. The framing is a health insurer with a cardiovascular prevention programme that can only book a fraction of its members each month and has to choose who.

## Accuracy counts the wrong thing

Accuracy is the share of right answers. When one class is 95% of the data, getting that class right is almost the whole score, and the minority barely moves it. Here are the four baselines, each scored with 5-fold cross validation on 80% of the data, with the other 20% kept aside and untouched:

| Model | Accuracy | Recall | Precision | PR-AUC |
| --- | --- | --- | --- | --- |
| Always "no stroke" | 0.951 | 0.000 | 0.000 | 0.049 |
| kNN, k = 15 | 0.951 | 0.000 | 0.000 | 0.118 |
| Current rule: age 60+ or hypertension | 0.719 | 0.779 | 0.123 | |
| Balanced logistic regression | 0.742 | 0.819 | 0.138 | 0.192 |

Read the accuracy column alone and the first two rows win. They're the useless ones. kNN is the more instructive failure, because it isn't empty: its ranking has some signal, a ROC-AUC of 0.71. But at the default 0.5 threshold no patient ever gets enough stroke neighbours to cross the line, so it labels everyone healthy. The model knows something and the threshold throws it away.

## Pick a metric that only moves when you find the cases

Recall is the share of real strokes you caught. Precision is the share of people you called who turned out to be real cases. Neither one gets anything out of the 95% majority, which is exactly why they're useful here.

For comparing models without picking a threshold first I use PR-AUC, the area under the precision-recall curve. Its floor is the prevalence, so random guessing scores 0.049 on this data, not 0.5 the way ROC-AUC would suggest. The logistic regression's 0.192 is almost four times chance. On ROC-AUC the same model reads 0.84, which sounds far more finished than it is.

```py
# sklearn: score the ranking, not the default threshold
cross_val_score(pipe, X, y, cv=StratifiedKFold(5), scoring='average_precision')
```

`average_precision` is sklearn's name for PR-AUC. And `StratifiedKFold` matters too: with 249 positives, an unstratified split can hand one fold noticeably fewer strokes than another, and the scores wobble for reasons that have nothing to do with the model.

## The threshold is a business decision

Precision of 0.138 sounds terrible. Turn it around and it says: for every seven patients you call in, one will turn out to be a real case. That's a sentence a programme manager can do something with, because their constraint is appointments per month, not a probability.

So the threshold isn't 0.5 and isn't chosen by the model. It's the point on the precision-recall curve that catches at least 80% of the cases with the highest precision available, and it moves when the clinic's capacity moves. The project's target is recall of at least 0.80 with precision of at least 0.15, roughly three times the base rate.

The rule the insurer already uses is the real opponent, and it's a decent one. Age 60 or over, or hypertension, books 30.8% of patients and catches 78% of the strokes. An untuned logistic regression already beats it on recall and on precision. None of the baselines reaches 0.15 yet, and that gap is the whole project.

## The objection: just rebalance the data

The usual reply is to oversample the minority with SMOTE, or weight the classes, and go back to accuracy. Class weighting is what the logistic regression above already uses, and it helps. It doesn't rescue accuracy, though: a balanced model gives up accuracy on purpose, 0.742 against 0.951, because it's now willing to flag healthy people. The metric still punishes the behaviour you wanted.

Rebalancing changes what the model learns. It doesn't change what the business needs to measure. And if you do use SMOTE, it has to run inside each training fold, after the split. Run it before and synthetic copies of test patients leak into training, and the cross validation reports a model that doesn't exist.

## What the EDA already says

Age dominates. The stroke rate goes from 0.4% under 40 to 18.0% over 70. Heart disease takes it from 4.2% to 17.0%, hypertension from 4.0% to 13.3%. BMI barely separates the groups at all. No single variable correlates above 0.25 with the outcome, which is my reason to expect tree ensembles to find interactions, like age with glucose, that a linear model misses. That's a guess until the comparison runs.

A model that scores 95% on this data hasn't learned anything about strokes. It has learned the prevalence.
