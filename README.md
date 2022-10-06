## TSA UI APP ##

#### Required Knowledge ####

**Javascript:**
JavaScript is a dynamic computer programming language. It is lightweight and most commonly used as a part of web pages, whose implementations allow client-side script to interact with the user and make dynamic pages. It is an interpreted programming language with object-oriented capabilities.

[Documentation](https://www.javascript.com/about)


**Angular:** 
Angular is a development platform, built on TypeScript. With Angular, it takes advantage of a platform that can scale from single-developer projects to enterprise-level applications. Angular is designed to make updating as straightforward as possible, so take advantage of the latest developments with a minimum of effort. Best of all, the Angular ecosystem consists of a diverse group of over 1.7 million developers, library authors, and content creators.

[Official documentation](https://angular.io/docs)

**Moment.js:**
Moment.js is a free and open source JavaScript library that removes the need to use the native JavaScript Date object directly. The library is a wrapper for the Date object (in the same way that jQuery is a wrapper for JavaScript) making the object a whole lot easier to work with.

[Official documentation](https://momentjs.com/docs/)

**Html2Pdf:**
The Html2PDJ.js library converts any web page or html element into a printable or downloadable pdf using entirely client-side html2canvas and jsPDF.

[Official documentation](https://html2pdf.app/documentation/)

**Bn-ng-idle:**
NgIdle is a simple user idle/session timeout detector service for Angular (Anonymous, bn-ng-idle, 2022). Using this tool allows automatic logout when the session timeout expires in the application UI.

[Official documentation](https://www.npmjs.com/package/bn-ng-idle)

**Boostrap:**
Bootstrap is a free, open source front-end development framework for the creation of websites and web apps. Designed to enable responsive development of mobile-first websites, Bootstrap provides a collection of syntax for template designs.

[Official documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/)



#### Required Software ####

**Visual studio code**
Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js

[Download](https://code.visualstudio.com/download)

**Gitbash**
Git for Windows provides a BASH emulation used to run Git from the command line. *NIX users should feel right at home, as the BASH emulation behaves just like the "git" command in LINUX and UNIX environment

[Official page](https://gitforwindows.org/)

#### Configuration and commands ####

Once the project is cloned on your machine.
You just have to execute the following command in the folder that contains the package.json file.

``` npm install ```

Once is istalled all the dependencies in the node_modules folder. Then execute the next command:

``` ng serve ```
The app runs, by default, on 4200 port. 

### Developt Enviroment Data ###
URL UI: 
https://tsa-ui-dev-c29b6.web.app/conductores


URL API:
https://tsa-api-dev.herokuapp.com


DATABASE:
    user: 'ckcxnsaucomdms',
    host: 'ec2-52-4-104-184.compute-1.amazonaws.com',
    database: 'djt874d1lt8f8',
    password: '9eb7c9badd978886e3056ffa62a81f09baa4dc423a8b70ccfe56629449074ecd',
    port: 5432,
    
### Production Enviroment Data ###
URL UI:
https://tsa-ui-prod.web.app/conductores

URL API:
https://tsa-api-prod.herokuapp.com/

DATABASE:
Host
ec2-34-194-73-236.compute-1.amazonaws.com
Database
d7n5e8aqji1c3q
User
apfgaxyifwqfay
Port
5432
Password
5d0239aba4dc6264e2ca7bdba59f2d85dc5f81ccce0ad85ac051ac67cd66d714

#### Setup and run the environment ####
All accounts and data can be found at the following link:
https://drive.google.com/drive/u/2/folders/1_rI_Z3V7uW2Y68FWh9wQE_pmWmABkLhB

#### Setup and run the environment ####

In order to run the UI you have to check if you have installed:

* [NodeJS](https://nodejs.org/en/)
* [AngularCLI](https://angular.io/guide/setup-local#install-the-angular-cli)
* [Git](https://git-scm.com/)

Once you have all the software requirements done, you can proceed to cloning the repository with the git command:
(You need access permissions)

```sh
git clone https://github.com/ericksuarlim/tsa-ui
```

Go to the project directory:

```sh
cd tsa-ui/
```

Immediately after that change your git credentials, run:

```sh
git config user.name "Your name"
```

and

```sh
git config user.email "name.lastname@example.com"
```

You can start installing the project packages with:

```sh
npm install
```

This can take a few minutes, meanwhile you can check the configuration files to make sure that you are using the API ip and port correctly.

For now, you may need to edit the url on these files:

`environment.ts` on line 12:

if you are using the tsa-api local:
```ts
export const environment = {
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyDw3pM8qh0vYHQvwJRriZtbkSNUSin0HQQ",
    authDomain: "tsa-ui-dev-c29b6.firebaseapp.com",
    projectId: "tsa-ui-dev-c29b6",
    storageBucket: "tsa-ui-dev-c29b6.appspot.com",
    messagingSenderId: "333512153438",
    appId: "1:333512153438:web:488f9635d90b1ebd8cd7cf",
    measurementId: "G-2V0RLHWW9V"
  },
  urlApi: "http://localhost:5000"
};
```
or if you are using the tsa-api production deployed:
```ts
export const environment = {
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyDw3pM8qh0vYHQvwJRriZtbkSNUSin0HQQ",
    authDomain: "tsa-ui-dev-c29b6.firebaseapp.com",
    projectId: "tsa-ui-dev-c29b6",
    storageBucket: "tsa-ui-dev-c29b6.appspot.com",
    messagingSenderId: "333512153438",
    appId: "1:333512153438:web:488f9635d90b1ebd8cd7cf",
    measurementId: "G-2V0RLHWW9V"
  },
  urlApi: "https://tsa-api-prod.herokuapp.com"
};
```

or if you are using the tsa-api development deployed:
```ts
export const environment = {
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyDw3pM8qh0vYHQvwJRriZtbkSNUSin0HQQ",
    authDomain: "tsa-ui-dev-c29b6.firebaseapp.com",
    projectId: "tsa-ui-dev-c29b6",
    storageBucket: "tsa-ui-dev-c29b6.appspot.com",
    messagingSenderId: "333512153438",
    appId: "1:333512153438:web:488f9635d90b1ebd8cd7cf",
    measurementId: "G-2V0RLHWW9V"
  },
  urlApi: "https://tsa-api-dev.herokuapp.com"
};
```
Once you have reach this point and the installation is finished, you can finally run the UI with the command:

```bash
ng serve
```

#### Deploy Information ####
To deploy to production
```bash
ng build --prod
```
```bash
firebase deploy --project prod
```
To deploy to develop
```bash
ng build
```
```bash
firebase deploy --project dev
```

#### Contact Information ####

Developer:
* Erick Suarez Lima / UCB: erick.suarez@ucb.edu.bo


