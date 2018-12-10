### 1. Explain why we put each consecutive call inside the onSuccess callback of the previous database call, instead of just placing them next to each other.
E.g.
database.call1(...);
database.call2(...);
database.call3(...);

In the post request to stats all 3 calls to database funcitons must complete successfully in order for the post request to get a successful status code returned from the server. The functions we call are asyncronous so in order to know if each function completed successfully they have to indicate so by calling onSuccess(). A call to onError by these functions indicates that an error occurred and the reponse from the server will contain a status code of 500 and an error message will be logged to the consle. If we would simply place the functions next to each other there would be no way of knowing if the previous function completed successfully because they execute in parallel.

### 2. what does the done parameter do?
The done parameter is a function that signals to the Jest test framework that the test has finished executing. The done parameter is a callback function used to test asyncronous code, it is called both if the test in question passes or fails.
