//literal type with objects
type HttpSuccessResponse = {
    status: 200 | 201 | 202;
    message: 'Success' | 'Created' | 'Accepted';
};
type HttpErrorResponse = {
    status: 400 | 401 | 403 | 404 | 500;
    message: 'Bad Request' | 'Unauthorized' | 'Forbidden' | 'Not Found' | 'Internal Server Error';
};
type HttpResponse = HttpSuccessResponse | HttpErrorResponse;

function handleResponse(response: HttpResponse) {
    if (response.status >= 200 && response.status < 300) {
        console.log(`Success: ${response.message}`);
    } else {
        console.log(`Error: ${response.message}`);
    }
}

const successResponse: HttpSuccessResponse = {
    status: 200,
    message: 'Success'
};
const errorResponse: HttpErrorResponse = {
    status: 404,
    message: 'Not Found'
};

handleResponse(successResponse); // Output: Success: Success
handleResponse(errorResponse);   // Output: Error: Not Found

// =============================================================================== //
//Template literal type
type HttpStatusCode = 200 | 201 | 202 | 400 | 401 | 403 | 404 | 500;
type HttpStatusMessage = 'Success' | 'Created' | 'Accepted' | 'Bad Request' | 'Unauthorized' | 'Forbidden' | 'Not Found' | 'Internal Server Error';

type HttpResponseTemplate_object = {
    status: HttpStatusCode;
    message: HttpStatusMessage;
};
let thisResponse1: HttpResponseTemplate_object = {
    status: 200,
    message: 'Success'
};
type HttpResponseTemplate_string = `${HttpStatusCode} ${HttpStatusMessage}`;
let thisResponse2: HttpResponseTemplate_string = '200 Success'; // Valid
// let thisResponse3: HttpResponseTemplate_string = '200 Not Found'; // Error: Type '"200 Not Found"' is not assignable to type 'HttpResponseTemplate_string'.


