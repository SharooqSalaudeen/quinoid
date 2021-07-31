Design a Form Component which would have the following inputs

    - Full Name
    - Email
    - Date of Birth
    - Region (Dropdown: Africa, Americas, Asia, Europe, Oceania)
    - Check Box (I agree to Terms and Conditions)
    - Submit Button

Once the form is submitted,

The countries with their details belonging to the selected region should be fetched using the API

    https://restcountries.eu/rest/v2/region/{region}

and should be populated in a table in the same page using another Component.

Validations:

    - Full Name should be validated against valid names ('John', 'John Doe' are valid names) and is mandatory
    - Email should be a valid email and is mandatory
    - Age should be a minimum of 18 (mandatory field)
    - Region is mandatory
    - Checkbox needs to be checked
    - Form should be submitted only if there is no Error.
    - Existing errors should be cleared before resubmission of the Form.

Conditions:

    - DO NOT USE JQUERY
    - Errors should be shown as inline text, instead of a popup
    - Loader is expected when the form is submitted to fetch the results.
