# PrintQ
## Contributors
Developed by `mkron`, `ipinedad`, `conwuadu`, `Patback0`

Github Repo: https://github.com/cs0320-s2023/final_project_print_queue

## Project Description
Project spec: https://docs.google.com/document/d/1KhQjlAZPWq2Juw_vbPNj1rrShd86_1cfsPRRaeLaHA8/edit?usp=sharing

## Design Choices
TODO

## File Architecture 
* `backend` backend entry point.
    * `queueclasses` Main handler and supporting datatypes
        * `Job` record that represents jobs waiting for or printing or assigned to printers
        * `Printer` Represents individual printers and holds information about their states
        * `Status` Enum used to encode printer states
        * `JobQueue` A Queue data structure for jobs
        * `QHandler` Main handler
  * `Server` contains handling for GeoJSONs
    * `APIUtilities` helper functions for the API
    * `server` runs the spark server
  * `Frontend` TODO
           
## Tests
* `backend`
    * `unitTesting` tests the various commands accessed through qHandle, both individually, and in set sequences to ensure that state works properly
    * `fuzzTesting` generate random API calls roughly in the form expected by the backend and tests for non-200 result codes to ensure that all errors are handled properly by the API.


## API Endpoints
* `qHandle` the only api endpoint. can be invoked with a variety of "command" parameters, producing different results. Commands:
    * `enqueue` Takes "user", "contact", "duration", and "imgUrl" paramaters,
    produces a job, and adds it to the queue
    * `rejectQueue` Takes "user" and "contact" parameters, and removes Jobs with the specified contact from the Queue
    * `update` takes a "printer_name" and a "filament", "status", or both. updates the specified printer to the specified filament and/or status.
    * `rejectPrinter` takes a "printerName" parameter, sets the specified printer to "availible", and remvoes the current job 
    * `claim` takes a "printerName" parameter for a pending printer, and sets it to busy 
    * `getState`sends back a full image of the print queue, and the state of each printer
## Errors and Bugs
TODO

## Accessibility Considerations
TODO for frontend

## Running the Program
TODO for people who did deployment