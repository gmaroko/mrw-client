import { createContext } from "react";

const context = {
    "statusCode": "200",
    "statusMessage": "Success",
    "successful": true,
    "data": {
        "dates": {},
        "pages": 1,
        "results": [],
        "total_pages": 1,
        "total_results": 0,
    }
}

export const MoviesContext = createContext(context);
