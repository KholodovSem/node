#include <string>
#include <fstream>
#include <iostream>

int main()
{
    bool exit = false; // whether the application should keep running or exit
    while(!exit) 
    {
        std::string name; // the name of the file (path included)
        std::string content; // the content of the file
        std::ofstream outfile;

        int option;

        std::cout << "Menu:" << std::endl;
        std::cout << "[1] Create a new file" << std::endl;
        std::cout << "[2] Exit" << std::endl;

        std::cout << "FileCreator> Please choose an option ";
        std::cin >> option;

        switch (option)
        {
        case 1:
            // Get the file name from user
            std::cout << "FileCreator> Enter the name of the file: ";
            std::cin >> name;

            // Get the file content from user
            std::cin.ignore();
            std::cout << "FileCreator> Enter the content of the file: ";
            std::getline(std::cin, content);

            // Create the file...
            outfile.open(name);
            outfile << content << std::endl;
            outfile.close();

            std::cout << "The file was created successfully! " << std::endl;
            break;
        
        case 2:
        std::cout << "Exiting out of the application" << std::endl;
            break;
        }
    }
}

    