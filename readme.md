# Sleep analysis

Tool for analyzing sleeping patterns. Check it out [here](https://lcvriend.github.io/sleepanalysis/) (currently only available in Dutch).

## How to use?
### Observe sleep
Over one or more sessions observe sleeping patterns using the following statusses:

Status   | Translation | Mandatory?
---------|-------------|-----------
Inslapen | Fall asleep | x
Slapen   | Sleep       |
Wakker   | Awake       |
Waken    | Wake        |
Uit bed  | Out of bed  | x

### Store data
Store data in ";" separated csv with the following columns:

Column    | Translation    | Format
----------|----------------|-------
Sessie    | Session        |
Datum     | Date           | `YYYYMMDD`
Tijd      | Time           | `HH:MM:SS`
Status    | Status         |

### Perform analysis
Analyze the data by loading it into [the tool](https://lcvriend.github.io/sleepanalysis/).

## Example result
### Sleepquantification table
<table>
    <thead>
        <tr>
            <th>Sessie</th>
            <td>Inslaaptijd</td>
            <td>Waaktijd</td>
            <td>Totaal in bed</td>
            <td>Totaal slaap</td>
            <td>Totaal wakker</td>
            <td>n wakker</td>
            <td>Slaapefficiëntie</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>1</th>
            <td>02:29:00</td>
            <td></td>
            <td>09:43:00</td>
            <td>06:37:00</td>
            <td>00:37:00</td>
            <td>1</td>
            <td>68,1%</td>
        </tr>
        <tr>
            <th>2</th>
            <td>02:41:00</td>
            <td>00:06:00</td>
            <td>09:47:00</td>
            <td>07:00:00</td>
            <td></td>
            <td>0</td>
            <td>71,6%</td>
        </tr>
        <tr>
            <th>3</th>
            <td>01:56:00</td>
            <td>00:41:00</td>
            <td>09:31:00</td>
            <td>06:54:00</td>
            <td></td>
            <td>0</td>
            <td>72,5%</td>
        </tr>
        <tr>
            <th>4</th>
            <td>02:33:00</td>
            <td>00:40:00</td>
            <td>09:33:00</td>
            <td>05:03:00</td>
            <td>01:17:00</td>
            <td>1</td>
            <td>52,9%</td>
        </tr>
        <tr>
            <th>Gem.</th>
            <td>02:24:45</td>
            <td>00:21:45</td>
            <td>09:38:30</td>
            <td>06:23:30</td>
            <td>00:28:30</td>
            <td>0</td>
            <td>66,3%</td>
        </tr>
    </tbody>
</table>

### Timelines graph
![](static/example_sleep_pattern.svg)

### Developers
L.P.H. Vriend & L.C. Vriend
