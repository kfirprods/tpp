# How rules are ran with Python

NodeJS servers operate single-threadedly with the vision of doing mainly asynchronous IO.
Processing project files directly on the backend is definitely a bad idea.

Rules are written as independent python scripts and are ran asynchronously by the backend. The backend and the scripts communicate through the standard IO of the script process.

```javascript
var spawn = require("child_process").spawn;
var process = spawn('python', ["script.py"]);

process.stdout.on('data',function(chunk){
    var result = chunk.toString('utf8');
});
```

Rule scripts use a tpp module that abstracts the inter process communications.
#### Automated modifier sketch
```python
"""
Rule to remove lines that start with '#'
"""
import tpp

def tpp_main(file_lines, **rule_parameters):
    new_file_lines = []
    for line in file_lines:
        if len(line) > 0 and line[0] == '#':
            continue
        new_file_lines.append(line)
        
    return new_file_lines

# This ensures tpp_main is ran each time with the lines of a single file 
# Parameters are passed in as kwargs based on the parameters the rule defines
tpp.execute(tpp_main)
```
This script obviously deals with a very specific case, but could easily be more generic by using rule_parameters to remove lines based on run-time configurable values.

#### Validator sketch
```python
"""
Rule to notify upon instances of 'TODO'
"""
import tpp

def tpp_main(file_lines, **rule_parameters):
    for line_index, line in enumerate(file_lines):
        if 'TODO' in line.split():
            # Blocks until the user approves the instance of TODO in the code
            tpp.manual_confirmation(line_index, "TODO found")

# This ensures tpp_main is ran each time with the lines of a single file 
# Parameters are passed to tpp_main as kwargs
tpp.execute(tpp_main)
```
