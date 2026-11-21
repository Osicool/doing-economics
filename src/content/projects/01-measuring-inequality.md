---
title: Measuring inequality
summary: Use Lorenz curves and Gini coefficients to compare income distributions across countries.
order: 1
topic: Inequality
level: Introductory
dataset: World Inequality Database
---
## Learning objectives

- Construct a Lorenz curve from grouped income data.
- Calculate and interpret the Gini coefficient.

## Data

Download the income-share data by decile from the World Inequality Database for two countries of your choice.

## Tasks

1. Compute cumulative income and population shares.
2. Plot the Lorenz curve for each country.
3. Calculate the Gini coefficient using the trapezoid rule.

```python
import numpy as np
def gini(p, L):
    return 1 - 2 * np.trapz(L, p)
```

## Interpretation

Which country is more unequal, and does the answer depend on the measure used?
