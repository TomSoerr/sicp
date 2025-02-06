Explicit dispatch is the least flexible of them all. For every change in type and operation each function has to be adapted. 

Using data-directed style it is easy to add new operation. Just put/install the new function to the table. 

message-passing-style is best for adding new types. Because we can just create a new type using a "factory" with all the needed operations. However adding a new method requires changes to all "factories"