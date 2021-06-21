# Documentation Overview

- [Documentation Overview](#documentation-overview)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Import calliope-chart](#import-calliope-chart)
    - [Usage](#usage)
  - [Single Visualization Specification](#single-visualization-specification)
    - [Properties for data](#properties-for-data)
      - [1. Data from URL](#1-data-from-url)
      - [2. Inline Data](#2-inline-data)
    - [Properties for fact](#properties-for-fact)
    - [Properties for chart](#properties-for-chart)
    - [An Example](#an-example)

## Getting Started

### Installation

Use npm/yarn to install the libraries

```
npm install calliope-chart
```

or

```
yarn add calliope-chart
```

### Import calliope-chart

```
import {AutoVis} from "calliope-chart";
```

### Usage

(1) Create a DOM element that the visualization will be attached to.

```
<div id="vis"></div>
```

(2) Then, build your [visualization specification](#single-visualization-specification).
   
```
var yourSpec = {...}
```

(3) Finally, visualize the chart with the specification.

```
const autovis = new AutoVis();
autovis.container('#vis');
autovis.paragraph('#caption');
autovis.load(yourSpec);
autovis.generate();
```

## Single Visualization Specification

```
{
    // Properties for data (Required)
    "data": {
        "url": ...,
        "schema": [...]
    },

    // Properties for fact (Required)
    "fact": {
        "type": ...,
        "subspace": [...],
        "measure": [...],
        "breakdown": [...],
        "focus": [...]
    },

    // Properties for chart (Optional)
    "chart": {
        "size": ...,
        "type": ...,
        "style": ...,
        "duration": ...,
        "caption": ...,
    }
}
```

### Properties for data

#### 1. Data from URL

|  Property   | Type  | Description  |
|  ----  | ----  | ----  |
| url  | String | **Required**. A string describing the data source.<br>For example: `{"url": "data/cars.csv"}`|
| schema  | Object[] | An array of *field* objects. <br>**Default**: [] |

#### 2. Inline Data

|  Property   | Type  | Description  |
|  ----  | ----  | ----  |
| values  | Object[] | **Required**. The full data set, included inline.<br>For example: `{"values": [{"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43}]}`|
| schema  | Object[] | An array of *field* objects. <br>**Default**: [] |

### Properties for fact

|  Property   | Type  | Description  |
|  ----  | ----  | ----  |
| type  | String | **Required**. A string describing the fact type (one of `"trend"`, `"categorization"`, `"value"`, `"difference"`, `"distribution"`, `"proportion"`, `"rank"`, `"extreme"`, `"outlier"`, and `"association"`) |
| subspace  | Object[] | Subspace describes the data scope of the fact, which is defined by a set of data filters.<br>**Default**: [] |
| breakdown  | Object[] | Breakdown is a set of temporal or categorical data fields based on which the data items in the subspace are further divided into groups. <br>**Default**: according to the fact type.|
| measure  | Object[] | Measure is a set of numerical data fields based on which we can retrieve a data value or calculate a derived value, such as count, sum, avg, min, or max, by aggregating the subspace or each data group. <br>**Default**: according to the fact type. |
| focus  | Object[] | Focus indicates a set of specific data items in the subspace that require attention. <br>**Default**: according to the fact type. |

### Properties for chart

|  Property   | Type  | Description  |
|  ----  | ----  | ----  |
| size  | String | A string describing the chart size (one of `"small"` (235x150), `"middle"` (360x200), `"wide"` (560x220), and `"large"` (640x640))<br>**Default**: large |
| type  | String | A string describing the chart type (one of `"verticalbarchart"`, `"horizentalbarchart"`, `"progresschart"`, `"areachart"`, `"bubblechart"`, `"bubblemap"`, `"donutchart"`, `"filledmap"`, `"linechart"`, `"piechart"`, `"scatterplot"`, `"treemap"`, `"textchart"`, `"isotypebar"`, `"isotypecluster"`, `"isotypeproportion"`)<br>**Default**: Automatic recommendation based on fact  |
| style  | String | A string describing the chart style (one of `"business"`, `"comics"`, `"pictograph"`, ...)<br>**Default**: "business"  |
| duration  | Number | Time duration for chart animation<br>**Default**: 0 (static chart)|
| caption  | String | A string describing the chart<br>**Default**: ""  |

<!-- ### Properties for description

|  Property   | Type  | Description  |
|  ----  | ----  | ----  |
| text  | String | The text description for this chart.<br>**Default**: Automatic generation based on the fact. | -->

### An Example

```
{
    "data": {
        "url": "url/carsales.csv",
        "schema": [
            {
                "field": "Sales",
                "type": "numerical"
            },
            {
                "field": "Brand",
                "type": "categorical"
            },
            {
                "field": "Category",
                "type": "categorical"
            }
        ]
    },
    "fact": {
        "type": "difference",
        "subspace": [
            {
                "field": "Brand",
                "value": "Hyundai"
            }
        ],
        "measure": [
            {
                "field": "Sales",
                "aggregate": "sum"
            }
        ],
        "breakdown": [
            {
                "field": "Category"
            }
        ],
        "focus": [
            {
                "field": "Category",
                "value": "SUV"
            },
            {
                "field": "Category",
                "value": "MPV"
            }
        ]
    },
    "chart": {
        "size": "large",
        "type": "verticalbarchart",
        "style": "business",
        "duration": 1000
    }
}
```