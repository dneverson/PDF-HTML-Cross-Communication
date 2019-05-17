# PDF-HTML-Cross-Communication
View able PDFs in HTML allowing cross communication with JS and AcrobatJS for auto filling data and extraction of data in both directions (IE Only, Adobe API Issue) 

![GitHub](https://img.shields.io/github/license/dneverson/PDF-HTML-Cross-Communication.svg?style=plastic)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/dneverson/PDF-HTML-Cross-Communication.svg?style=plastic)
![GitHub contributors](https://img.shields.io/github/contributors/dneverson/PDF-HTML-Cross-Communication.svg?style=plastic)
![GitHub Version](https://img.shields.io/badge/Version-1.0-blue.svg?style=plastic)
![GitHub issues](https://img.shields.io/github/issues/dneverson/PDF-HTML-Cross-Communication.svg?style=plastic)
![GitHub closed issues](https://img.shields.io/github/issues-closed/dneverson/PDF-HTML-Cross-Communication.svg?style=plastic)


## Getting Started

- AdobeJS API only works in Internet Explorer
  - This is an issue with Adobe
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
