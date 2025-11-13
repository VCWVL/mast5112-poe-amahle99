[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/TGHrDa37)
Menu Maestro
 Project Overview

Menu Maestro is a mobile application built with React Native and Expo, designed to manage and browse a restaurant's menu. It caters to two main user roles: **Chefs** who can manage menu items (add, edit, delete), and **Guests** who can browse the menu, filter by category, view item details, and add items to a shopping cart.

The application features a dynamic menu display, a shopping cart system, and a management interface for chefs to keep the menu updated.

## Features

-   **Splash Screen**: An engaging initial screen with options to log in or browse the menu as a guest.
-   **Authentication Screen**: Allows users to log in as a "Chef" to access management functionalities or proceed as a "Guest" to browse the menu.
-   **Guest Mode**:
    -   Browse all menu items or filter by categories (Brunch, Lunch, Dinner).
    -   View average prices per category.
    -   Add items to a shopping cart.
    -   View cart contents and total price.
-   **Chef Mode (Manage Menu)**:
    -   Add new menu items with details like name, price, description, category, and image.
    -   Edit existing menu items.
    -   Delete menu items.
    -   Logout functionality.
-   **Dynamic Menu Display**: Menu items are rendered using `FlatList` for efficient scrolling.
-   **Modal for Editing/Adding**: A modal interface for a smooth user experience when managing menu items.
-   **Image Handling**: Local image assets are used for menu items.

## Technologies Used

-   **React Native**: For building native mobile applications using JavaScript and React.
-   **Expo**: A framework and platform for universal React applications, providing tools and services for building, deploying, and quickly iterating on native apps.
-   **TypeScript**: For type-safe JavaScript development.
-   **`@expo/vector-icons`**: For easily using a variety of icon sets.




Changelog:
Core Application Structure:

Implemented a multi-screen application structure using React state for navigation.
Defined screens for: Splash (splash), Authentication (auth), Guest Menu (guest), Shopping Cart (cart), and Menu Management (manage).
User Roles & Authentication:

Established a basic role system for "chef" and "user".
The splash screen provides entry points to either log in or browse as a guest.
The authentication screen contains a "Login as Chef" button to proceed.
Guest Experience (guest screen):

Guests can view the full menu or filter items by category: "All", "Brunch", "Lunch", and "Dinner".
A summary card displays the calculated average price for items in the Brunch, Lunch, and Dinner categories.
Includes a "Login" button for guests who wish to authenticate.
Shopping Cart (cart screen):

Functionality to add items to a shopping cart. The cart state tracks items and their quantities.
Users can remove items from the cart one by one.
The cart screen displays all added items, their quantities, and the total price.
A "Back to Menu" button allows navigation from the cart.
Chef Experience (manage screen):

A dedicated screen for chefs to manage the menu.
CRUD Functionality:
Create: Chefs can add new menu items using a modal form, specifying name, price, description, and category.
Read: The screen displays a complete list of all menu items.
Update: Existing items can be edited through the same modal interface.
Delete: Items can be removed from the menu.
Session Management: A logout button is provided, which resets the user's role and returns to the authentication screen.
REFRENCES : 
unsplach.com.za
feedback from part 1 and 2
gemini 
blackbox 
chrome
