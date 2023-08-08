# Introduction

Redefine Ecommerce

You have to add

# Getting Started

TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:

1. Clone the Repository
   git clone <repository_url>
2. Navigate to RepositoryFolder
   cd <repository_url>
3. Create Environment variable & Installation Process
   cp .env.template .env.development for development environment
   cp .env.template .env.production for production environment
   Don't forgot to update the environment variable.
   npm i --legacy-pears
4. Create page.config.js in configs folder may be named as configs_v2 with Following

   export const \_Store = { if multiple store then you can create the different types
   type1: 'CG',
   };
   export const \_StoreDomains = {
   domain1 = 'www.example.com'
   }

   export const \_\_domain = {
   isSiteLive: false, //for local environment it should be false
   localDomain: \_StoreDomains.domain1, //It will match the store domain fetch its data
   };
   
   //Other variables
   export const defaultCountry = 1;
   export const storeBuilderTypeId = 4;
   export const defaultState = 1;
5. 

# Build and Test

    npm run build.

    npm run dev

# Contribute

TODO: Explain how other users and developers can contribute to make your code better.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

- [NextJs]
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)
