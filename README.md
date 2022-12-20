# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)


Clone Onboarding Repo:
--------------------------------------
Azure Repo Commands:

// Install git bash on windows

//switch to bash mode
$ bash

//generate SSH keys
$ ssh-keygen

// Your public key has been saved in /Users/<user>/.ssh/id_rsa.pub.

$ cat /Users/<user>/.ssh/id_rsa.pub

// copy the cat output and paste in Azure Repos - Manage  SSH Keys > Add

$git init

// clone Onboarding repo
bash$ git clone git@ssh.dev.azure.com:v3/softwarelicense/Onboarding/Onboarding


// cd Onboarding

basgh$ git pull

# Webappl - Production Releases Checklist
- master tag is created
- PR is merged to master (Sharaf + Rayees)
- PR review for develop & release (Rayees / Raj)
- All release doc to be reviewed
    - Sanity scope
    - Regression scope
    - Followup


