# User Interaction Sketch
This is a sketch grade description of the general user interaction of tpp.

### Authentication
To use the utility, users must have an account.
Accounts can be in the form of: 
- Username, email and passsword (classic)
- Google account
- Domain based Windows authentication (for organizations)

### Interaction Flow
##### First entry
As new users enter the main page of the utility's website, they see a descriptive introductory page.
A large button seduces them to get started and takes them to the registration page, where they authenticate.

##### Creating a project
After logging in for the first time, users are taken to their projects page. Having no projects at all, their only possible interaction is to create a new project.
A project consists of:
- Title
- List of other users allowed to access the project (input to work like Facebook's tag system)
- List of tpp rules that apply to the project (each rule requires its own parameters and thus has a large custom input control)

##### Processing Project Files
Once a project is created, users can start processing project files. They may upload a .ZIP file or simply select multiple individual textual files, with the total upload size limited to a reasonable size (approx 15 MB).

tpp rules that require manual interaction will trigger a Visual Studio debugging-like experience, where the users see a portion of the code, with the relevant line being marked lightly and the relevant words marked boldly.

When processing is done, a .ZIP file is created with the processed files. The ZIP file shall not persist on the server and users should thus be advised to download it right at the moment.

### Applicable tpp rules
A rule defines an atomic post processing operation, e.g removing comments or requiring manual approval for certain words.
Rules may accept parameters, e.g the word approval rule may accept a list of words to demand approval for.

##### Automated Modifiers
Rules that make changes to the text and do not require any user interaction.

##### Validators
Rules that validate the text. Invalid text triggers user confirmation, where users can either approve the invalidity or decide to cancel the entire tpp operation, so that they can make changes to the source files.

# Conclusions
### Required Frontend Views
1) Main View (introductory, 'get started', etc)
2) Sign Up View (new account)
3) Login View (existing account)
4) My Projects View
5) Create new project
6) Edit existing project
7) Start Operation (upload project files)
8) 'Validation required' view (code line marked with markup)
9) Operation finished (download files)

1,2,3 should form a single page
4, 5 should form a single page
6, 7, 8 should form a single page.

### Required Backend API
- Register (POST)
- Login (POST)
- Get user projects (GET)
- Create project (POST)
- Edit project (POST)
- Process single file content using project rules (POST)
