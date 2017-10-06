# Client design for Project Processing
## Server
Relevant API calls exposed by the server:
```
POST /projects/:projectId/preprocess
POST /projects/:projectId/processfile
```
### preprocess
This operation makes the server clone the project repository from the user defined source control.
The server then returns a list of file names that require processing. Each file shall be processed seperately.

### processfile
This operation processes a single file using the project-specific parameters. The response may contain validations, in which case the client chooses whether to dismiss the warning or abort the processing.

## Client
The client starts by calling `preprocess` and showing a static loading animation.
When preprocessing is complete, the client calls `processfile` for each file returned by the `preprocess` operation.

As for UI, a large vertically centered progress bar reflects the percentage of processed files. It is accompanied by a text label in the format of `Processing folderName\fileName.ext`

###### Pseudo Code
```javascript
post('/projects/1/preprocess', function(response) {
    let fileNames = response.data;
    this.setState({
        filesProcessed: 0,
        totalFileCount: fileNames.length
    });
    
    // WARNING: not really foreach; every post to `processFile` shall pop the next
    // file name from the queue
    fileNames.forEach(function(currentFile) {
        // update the text label to reflect the current file name
        this.setState({currentFile: currentFile});
        post('/projects/1/processFile', {filename: currentFile}, function(response) {
            let validations = response.data;
            if (validations.length > 0) {
                // some code to show the user their code with markup
                // with each problematic area of text marked
                // a baloon-like dismiss/abort dialog comes out of said marked lines
            }
            
            // update the progress bar
            this.setState({filesProcessed: this.state.filesProcessed+1});
            
            // process next file somehow
        });
});
```
