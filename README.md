# tpp
Textual Post Processing for projects is an open source utility for applying validations and automated changes to text, mainly targeting projects of code.

Users define rules for their project, such as "replace occurrences of X with Y", or "require manual confirmation for occurrences of TODO". 
Whenever users wish to process their project files, they can either upload a compressed archive that contains their source files or alternatively process a source control branch (git/hg). The result can then be downloaded as a compressed archive, or be comitted to git/hg.

tpp is written with NodeJS for backend and ReactJS for the frontend, whereas the actual text processing is done with simple Python scripts executed in a separate process on the server.
