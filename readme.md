# Sleep analysis

Tool for analyzing sleeping patterns. Check it out [here](https://lcvriend.github.io/sleepanalysis/) (currently only available in Dutch).

## How to use?
Over one or more sessions observe sleeping patterns using the following statusses:

Status   | Translation
---------|-------------
Inslapen | Fall asleep (mandatory)
Slapen   | Sleep
Wakker   | Awake
Waken    | Wake
Uit bed  | Out of bed (mandatory)

Store data in ";" separated csv with the following columns:

Column    | Translation    | Format
----------|----------------|-------
Sessie    | Session        |
Datum     | Date           | `YYYYMMDD`
Tijd      | Time           | `HH:MM:SS`
Status    | Status         |

Load the data.

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
            <td style="background-color: darkred; color: whitesmoke;">02:29:00</td>
            <td></td>
            <td>09:43:00</td>
            <td style="background-color: darkred; color: whitesmoke;">06:37:00</td>
            <td>00:37:00</td>
            <td>1</td>
            <td style="background-color: darkred; color: whitesmoke;">68,1%</td>
        </tr>
        <tr>
            <th>2</th>
            <td style="background-color: darkred; color: whitesmoke;">02:41:00</td>
            <td>00:06:00</td>
            <td>09:47:00</td>
            <td>07:00:00</td>
            <td></td>
            <td>0</td>
            <td style="background-color: darkred; color: whitesmoke;">71,6%</td>
        </tr>
        <tr>
            <th>3</th>
            <td style="background-color: darkred; color: whitesmoke;">01:56:00</td>
            <td>00:41:00</td>
            <td>09:31:00</td>
            <td style="background-color: darkred; color: whitesmoke;">06:54:00</td>
            <td></td>
            <td>0</td>
            <td style="background-color: darkred; color: whitesmoke;">72,5%</td>
        </tr>
        <tr>
            <th>4</th>
            <td style="background-color: darkred; color: whitesmoke;">02:33:00</td>
            <td>00:40:00</td>
            <td>09:33:00</td>
            <td style="background-color: darkred; color: whitesmoke;">05:03:00</td>
            <td>01:17:00</td>
            <td>1</td>
            <td style="background-color: darkred; color: whitesmoke;">52,9%</td>
        </tr>
        <tr>
            <th>Gem.</th>
            <td style="background-color: darkred; color: whitesmoke;">02:24:45</td>
            <td>00:21:45</td>
            <td>09:38:30</td>
            <td style="background-color: darkred; color: whitesmoke;">06:23:30</td>
            <td>00:28:30</td>
            <td>0</td>
            <td style="background-color: darkred; color: whitesmoke;">66,3%</td>
        </tr>
    </tbody>
</table>

### Timelines graph
![](static/example_sleep_pattern.svg)

### Developers
L.P.H. Vriend & L.C. Vriend
