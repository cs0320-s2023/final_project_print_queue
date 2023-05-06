# PrintQ
## Contributors
Developed by `mkron`, `ipinedad`, `conwuadu`, `Patback0`

Github Repo: https://github.com/cs0320-s2023/final_project_print_queue

## Project Description
TODO

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
TODO


## API Endpoints
* `qHandle` the only api endpoint. can be invoked with a variety of "command" parameters, producing different results
    *TODO
## Errors and Bugs
TODO

## Accessibility Considerations
TODO

## Running the Program
TODO