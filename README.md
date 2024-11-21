# TechBazaar

TechBazaar is a fake e-commerce site built for demonstration purposes. It showcases basic e-commerce functionalities such as product listing, user authentication, shopping cart, checkout, admin dashboard and more!

## Overview

This repository contains the code for TechBazaar, a fake e-commerce web application. It interacts with the [TechBazaar API](https://github.com/chideraemmanuel/techbazaar-api), which is responsible for handling data retrieval and user session management.

This document is intended to provide an overview of the project, the technologies used, and brief explanations of the major features of the application.

## Live Demo

Check out the live demo of the application [here](https://techbazaar.vercel.app/).

## Features

The web application includes all the basic features of a typical e-commerce web application, such as;

- **Product Listing**: Users can seamlessly browse products, and view their details. The added search, filtering options, and pagination makes the process much easier and intuitive.
- **Shopping Cart Management**: The application also enables users to perform typical shopping cart functions, like adding and/or deleting items from cart, incrementing item quantity, and all that good stuff!
- **Checkout and Orders Management**: Though no payment gateway was integrated, the application provides an option to checkout the items in a user's cart, and also properly manages the orders that have been made!
- **User authentication**: Users also have the option to create an account, or login if they previously signed up! The account creation process includes email validation, and users can also reset their password.
  - _Note that for features like cart management, orders management and the likes, an account is required._
- **Admin Dashboard**: It includes a dashboard that allows admins to manage products, orders, and user data.
  - _For demonstration purposes, normal users are allowed to view the admin dashboard (excluding pages with sensitive information), but aren't allowed to perform data mutation actions._

### Other noteworthy features/behavior

- **Server-side Data Fetching**: Major data fetches in the application are carried out on the server with the help of React's Server Components! This has several benefits, including faster data fetches, SEO, and decreasing client side JavaScript.
- **Server State Management**: All major states in the application (e.g cart items and quantity), as well as mutations (e.g adding an item to cart) are managed on the server. This is to ensure safety, and the integrity of the data flow in the application.
- **URL State Management**: For client state (products filter, pagination...), the application makes use of the URL. This approach has several benefits and makes for a good user experience!
- **Optimistic UI Updates**: Since most of the web application's states are managed on the server, it wouldn't be ideal to have users wait around for server mutations to complete before receiving feedback, hence the implementation of optimistic UI updates. This ensures that the UI is updates as soon as a mutation is performed, while the network request is done in the background.
- **Theme Toggle**: Users can switch between light and dark mode at will, and this will be persisted!

## Techologies Used

- **Frontend & Backend**:

  - **Next.js**: Fullstack framework used for both the application's frontend, and backend APIs. It offers features such as server-side rendering, static generation, and API routes for efficient data fetching.

- **UI Components & Styling**:

  - **Radix UI**: A library of accessible, unstyled UI primitives, giving control over styling while maintaining accessibility.
  - **Tailwind CSS**: Utility-first CSS framework for rapid design and responsive layouts.

- **State Management & Forms**:

  - **React Query**: Used for managing server-side data fetching, caching, and synchronization.
  - **React Hook Form**: Lightweight library for handling forms and validation.

## Running the Application Locally

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js (or any package manager of your choice)**: Make sure you have Node.js (or your preferred package manager) installed on your machine.

### Installation

1. Clone the repository

```bash
git clone https://github.com/chideraemmanuel/techbazaar.git
```

2. Install dependencies

```bash
npm install
```

### Configuration

#### Environment variables

To configure the environment variables, please refer to the `.env.example` file located in the root of the project. This file contains all the necessary environment variables you need to set up. Simply create a `.env.local` file based on the example and update the values as required for your environment.

### Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Access the application: Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the application.
