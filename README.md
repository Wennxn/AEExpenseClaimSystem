# UBC-2019 Blueprint

This document is a project blueprint for the Associated Engineering Expense project. The purpose of the doucment is to provide the teams with a starting point, and some guidance on the project structure.

## Prerequisites

You'll need the following applications installed on your machine before getting started:

Application | Version | Usage
--- | --- | ---
[git](https://git-scm.com/downloads) | Any | for cloning repo
[Visual Studio](https://visualstudio.microsoft.com/downloads/) | Community Edition or Latest | for service
[SQL Server Express](https://www.microsoft.com/en-ca/download/details.aspx?id=55994) | 14.0.1000.169 | for database
[Node.js/NPM](https://www.npmjs.com/get-npm) |  Latest LTS Version | for client

Account | Usage
---|---
[Microsoft Azure](https://azure.microsoft.com/en-ca/features/azure-portal/) | for authentication

## Set-up and Configuration Instructions

1. Clone the repo [here](https://dev.azure.com/associated/AE-UBC/_git/cpsc319-2019-blueprint)

    ``` bash
    git clone https:path/to/repo
    ```

2. After the repo is cloned, navigate to the ../cspc319-2019-blueprint directory

    ``` bash
    cd cpsc319-2019-blueprint
    ```

### Configure Database and Service

#### Create local database

1. Open SQL Server Management Studio (SSMS)
2. Create a new local database instance (Right-click Databases>New Database...>give Database a name)

#### Prepare the database and populate

1. Navigate to the ../src/svc-dotnetcore directory

    ```bash
    cd src/svc-dotnetcore
    ```

2. Double click on svc-dotnetcore.sln to open up the Visual Studio solution, in solution explorer you will find two projects (Database, Web.API)
3. Right click on the Database project and select 'Publish...'
4. In the Publish Database window select 'Edit...'
5. Select the 'Browse' tab and enter the server name (same as the one in SSMS), using the dropdown menu, select the database instance in (SMSS), click on 'Test Connection' and ensure the connection is successful, click 'OK' once the test connection is successful
6. In the Publish Database window click on 'Advanced...'
7. In the 'General' tab under the 'Deployment Behavior' section, 'Uncheck Block incremental deployment if data loss might occur' and click 'OK' to confirm settings
8. In the Publish Database window, click on 'Save Profile As...', enter the File name as Database.DEV.publish.xml, ensure the file path pointing at the Database project in Visual Studios before hitting 'Save'
9. In the Publish Database window click 'Publish'
10. In the Database project open up the seed.sql file (scripts>seed.sql) and copy the SQL statements
11. Navigate to (SMSS) and create a 'New Query' in your database instance
12. Paste the SQL statments from the seed.sql and execute the statements to populate the database

#### Prepare the service

1. In the Web.API project, create a copy of appsettings.json and name it appsettings.Development.json
2. Edit appsettings.Development.json, in the ConnectionString replace the Data Source with the server name (same server name in SMSS), replace the Initial Catalog with the database name (same as database name in SMSS), and save the changes to the file

    ```json
    "ConnectionString": "Data Source=server_name; Initial Catalog=database_name; Integrated Security=True;"
    ```

3. Run the Web.API project
4. Visit [http://localhost:your_port/expenses/all]() to ensure you are getting data back from your database

### Configure the Client

1. Navigate to ../cpsc319-2019-blueprint/src/ui-react-client
2. Run npm install

    ```bash
    npm install
    ```

3. Open up ../ui-react-client using a text editor or IDE of your choice, then edit the .env file to appropriate localhost (same as the one in Visual Studios)

    ```txt
    REACT_APP_SVC_ROOT = http://localhost:your_port/
    ```

    To check your port, go to your Visual Studio solution and navigate to launchSettings.json of the Web.API project (Properties>launchSettings), and look for the applicationUrl

    ```json
    "applicationUrl": "http://localhost:your_port/",
    ```

4. Run npm start to run the client application

    ```bash
    npm start
    ```

    Should see menu items for Home, Users, Expenses. Pages will be blank until you wire up the service with the client

### Authentication

#### Registering a new application on Azure

1. Log into [Microsoft Azure](https://azure.microsoft.com/en-ca/features/azure-portal/)
2. Navigate to ['portal'](https://portal.azure.com/#home)
3. Click on 'Azure Active Directory', click on 'App registrations', click 'New Registration' to create a new application
4. Give the application a name, under 'Supported account types' select 'Accounts in this organizational directory only (... only - Single tenant), under 'Redirect URI(optional) select 'Web' in the dropdown, and enter http://localhost:3000/, then hit 'Register'
5. Naviagte to 'Manifest' and set "oauth2AllowIdTokenImplicitFlow" and "oauth2AllowImplicitFlow" to true and hit 'save'

    ```json
        "oauth2AllowIdTokenImplicitFlow": false,
        "oauth2AllowImplicitFlow": false,
    ```

6. Navigate to 'API Permissions', click 'Add a permission', click on 'Microsoft Graph', click on 'Delegated permissions' and add the 'User.Read' and 'Profile' permission
7. Navigate to 'Authentication' and under 'Implicit Grant' ensure that 'Access Tokens' and 'ID tokens' are checked

#### Configuring the client

1. Open up the React client project
2. On portal Azure Navigate to 'Overview' and copy the 'Application (client) ID', 'Directory (tenant) ID'
3. In React, open adalConfig.js (config>adalConfig.js) and paste the clientId property with 'Application (client) ID' from Azure, and paste the tenant proprty and endpoints:api property with the 'Directory (tenant) ID from Azure

    ```javascript
        export const adalConfig = {
            tenant: '<Directory (tenant) ID>',
            clientId: 'Application (client) ID',
            endpoints: {
                api: '<Directory (tenant) ID>',
            },
            cacheLocation: 'localStorage',
        };
    ```

#### Configuring the service

1. Open up the service project in Visual Studios
2. Edit the appsettings.Development.json file to your respective 'tenant' and 'clientId'

    ```json
        "AzureAd": {
            "Instance": "https://login.microsoftonline.com/",
            "Tenant": "<Directory (tenant) ID>",
            "ClientId": "<Application (client) ID>"
        }
    ```

### Run Full Stack (service and client)

1. Run the service in Visual Studio
2. Run the front end,navigate to localhost:3000 if browser does not open page up on its own

    ```bash
    npm start
    ```

3. Will be prompted with a microsoft login / permissions page, enter the necessary login credentials
4. Click on the Expenses or Users pages, or navigate to http://localhost:3000/expenses or http://localhost:3000/users
5. You should be seeing the data underneath the Users and Expenses h1 heading
