# ToDo List App
Useing React 16 with Hooks and Custom Hooks

- [x] - Have a header, main, and footer
- [ ] - To Do form to enter items to do
  - [ ] - form should have status and difficulty
- [x] - To Do List list items and have a complete status
  - [x] - style items to complete differently
  - [x] - toggle complete status of items
- [ ] - Use the useEffect() hook to change count
  - [ ] - change count in title
- [ ] - Connect to running API server
  - [ ] - On load display all of the to do items from db
  - [ ] - When adding an item issue a POST
  - [ ] - When marking todo items complete issue a PUT
  - [ ] - When deleting items issue a DELETE
- [ ] - Use the `useForm()` hook to manage add item form
- [ ] - create a `useFetch()` custom hook to abstract API calls


# Setup and start

- `json-server --port 3001 --watch db.json`
- (from another terminal window) `npm run start` Go to localhost:3000
- `http get :3001/items` will return contents of db.json


# Useful links

[MDN Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)