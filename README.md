# PDF-HTML-Cross-Communication
Embed PDFs in the web browser allowing cross communication via JS and AcrobatJS. Enabling injection of data, auto fill capabilities,   and extraction of data in both directions (IE Only). 

![GitHub Version](https://img.shields.io/badge/Version-1.0-blue.svg?style=plastic)
![GitHub](https://img.shields.io/github/license/dneverson/PDF-HTML-Cross-Communication.svg?style=plastic)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/dneverson/PDF-HTML-Cross-Communication.svg?style=plastic)
![GitHub contributors](https://img.shields.io/github/contributors/dneverson/PDF-HTML-Cross-Communication.svg?style=plastic)
![GitHub issues](https://img.shields.io/github/issues/dneverson/PDF-HTML-Cross-Communication.svg?style=plastic)
![GitHub closed issues](https://img.shields.io/github/issues-closed/dneverson/PDF-HTML-Cross-Communication.svg?style=plastic)


## Getting Started

- Communication from an embedded pdf to the browser only works in Internet Explorer
  - This is an issue with Adobe AcrobatJS API
- Comment out GE Centricity CPS Function Libraries in pdfViewer.html to avoid errors.
  - this will function both in (with proper libaries [1]) and out of Centricity.
  - Centricity CPS 12.3 or higher.
- Needs to run on a webserver for AngularJS to work properly.


## Built With

* AngularJS
* Vanilla JS
* Bootstrap
* HTML
* CSS
* MEL[1]


## Version
V1.0

## Authors

* **Derry Everson** - [Catalyst Medical Group](https://www.catalystmedicalgroup.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

[1] Contact me if you would like to obtain GE Centricity CPS EMR JS API Libraries. deverson@valleymedicalcenter.com
