import employees from "@/data/employees.csv";
import customers from "@/data/customers.csv";
import customersDE from "@/data/customersDE.csv";
import orders from "@/data/orders.csv";
import janet from "@/data/janet.csv";

import { minimize } from "@/utils/string";

const allEmployeesQuery = `SELECT * FROM employees
ORDER BY hireDate DESC;
`;

const allCustomersQuery = `SELECT * FROM customers
ORDER BY customerID ASC;
`;

const customersDEQuery = `SELECT * FROM customers
WHERE country = 'Germany'
ORDER BY customerID ASC;
`;

const janetQuery = `SELECT * FROM employees
WHERE firstName = 'Janet'
AND firstName = 'Janet'
AND lastName = 'Leverling'
AND titleOfCoutesy = 'Sales Representative';
`;

const allOrdersQuery = `SELECT * FROM orders
ORDER BY orderDate ASC;
`;

const queries = [
  {
    name: "All employees",
    author: "John Doe",
    content: allEmployeesQuery,
    table: "employees",
    data: employees,
  },
  {
    name: "All orders",
    author: "John Doe",
    content: allOrdersQuery,
    table: "orders",
    data: orders,
  },
  {
    name: "All customers",
    author: "John Doe",
    content: allCustomersQuery,
    table: "customers",
    data: customers,
  },
  {
    name: "Janet Leverling's details",
    author: "Jane Doe",
    content: janetQuery,
    table: "employees",
    data: janet,
  },
  {
    name: "Customers from Germany",
    author: "Jane Doe",
    content: customersDEQuery,
    table: "customers",
    data: customersDE,
  },
].map((rec, index) => ({ ...rec, id: index + 1 }));

export default queries;

export const getData = (key, value) => {
  if (!key || !value) return;
  return queries.find((q) => q[key] === value);
};

export const getDataByQuery = (query) => {
  if (!query) return;
  const value = minimize(query).toLowerCase();
  return queries.find((q) => minimize(q.content).toLowerCase() === value);
};
