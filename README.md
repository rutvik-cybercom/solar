# solar_website

This is a website front-end project for a solar energy company, built using React.js. The website is designed to showcase the company's products and services related to solar energy, as well as provide educational resources and information about the benefits of solar power.

## Features

The solar_website front-end includes the following features:

- Responsive design: The website is optimized for desktop, tablet, and mobile devices.
- Navigation: Users can easily navigate through the website to find the information they need.
- Product and service pages: The website includes dedicated pages for each of the company's products and services related to solar energy.
- Educational resources: The website provides informative resources about solar power, including blog posts and articles.
- Contact form: Users can easily get in touch with the company by filling out a contact form.

## Technologies Used

The solar_website front-end is built using the following technologies:

- React.js
- HTML
- CSS
- Bootstrap

## Installation

To install and run the solar_website front-end locally, follow these steps:

1. Clone the repository to your local machine using `git clone https://github.com/your-username/solar_website.git`.
2. Install the required dependencies by running `npm install`.
3. Start the local development server by running `npm start`.
4. Open your browser and navigate to `http://localhost:3000/` to view the website.

### Deployment Environment
  * AWS
### Environment Variables
 * AWS_ACCESS_KEY_ID
 * AWS_SECRET_ACCESS_KEY


### Branching strategy
  * main branch - production environemnt deployment
  * development - development/test environment deployment
## Branch naming convention
  * regular expression for branching name convention /(bugfix|feature)\/#[0-9]+[-\w]/gm
  *  bugfix/#1-fixing-for-july-patch or bugfix/#1-fixing_for_july_patch
  *  #1 is the issue number in GitHub

### Protected Master Branch with rules:
  * Require a pull request before merging
  * Require approvals - 1
  * Dismiss stale pull request approvals when new commits are pushed
  * Require review from Code Owners
  * Require approval of the most recent reviewable push
  * Require status checks to pass before merging
  * Require conversation resolution before merging

### Contributing

Contributions to the solar_website front-end are welcome! If you would like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
