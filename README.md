This is a [Next.js](https://nextjs.org) project created with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
First clone the repository into your local machine:
```bash
git clone https://github.com/Hp2006dec10/admin_dashboard.git
```

Then install all the dependencies:
```bash
npm install
```

Now, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## App design layout
- The dashboard page that opens first is just a sample page. Click on Menu management to navigate to the menu page.
- Almost all the functionalities in the main page are implemented.

## Code order
1. Data fetching using the class `FoodItemDetails`
2. State variables implemented using `useState`
3. `HTMLDivElement` references for drop-down functionality
4. Useful constants
5. `useEffect` hooks and handler functions to handle the drop-down functionality
6. Getter functions that oeprate on data based on different filters
7. Write functions that edit the data
8. Pagination and page navigation functions

**NOTE: This is not a mandatory order and used only for easier understanding and navigation

## Data management
- As of now, the menu item data is implemented through a sample variable, you any change made to the menu is not persistent across `refresh`.
- However, data access is done by the virtue of `Object Oriented Programming` approach which simplifies the code to upgrade to database version.

## Features to be added
- Responsive design
- Addition of new items
- Management of categories
- Database connection and working with real time data

**NOTE: Any update to the UI is appreciated and encouraged.

