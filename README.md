
React Components: just render views in accordance with the current state of the store. They contain only pure presentation logic.
Reducers: just update the state of the store in accordance with the data transmitted from the action. They do not contain any logic other than update logic. 
Sagas: implement any other logic, including all kinds of side effects.