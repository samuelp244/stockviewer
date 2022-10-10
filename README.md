Pages - 
    / - InstrumentsPage.tsx
    /quotes/ - Quotes.tsx

InstrumentsPage.tsx - The api data is split and converted into a json object array. The data array is then listed, and when clicked, it is directed to the quotes page with the symbol passed in the route. When a query is entered into search, the data is filtered so the data that contains the query is returned.

Quotes.tsx - The data is retrieved and listed using the symbol from the route parameters. When you click time, the data is ordered by comparing time. When time runs out, the date-times are compared to compute the time difference (milliseconds), then settimeout is used to refresh after the calculated milliseconds.
