import { GraphQLError } from 'graphql/error';

const ErrorMsg = {
    invalid_viewer: 'Viewer is invalid',
    invalid_doc: 'Document is invalid or could not be found',
    invalid_id: 'Invalid ID was passed to the "$0" model',
    no_db_found: 'Requested database could not be found',

    user_not_found: 'User was not found',
    incorrect_password: 'Incorrect password',
    password_too_short: 'Your password is too short',
    phone_required_provider: 'Phone number is required for provider registration',
    too_many_params: 'You can only pass one of "$0" fields',
    one_required_params: 'You must pass one of "$0" fields',

    // Auth Related Errors
    not_logged_in: 'You are not logged in',
    not_authorized: 'You are not authorized to view this data or perform the action; "$0"',
    no_organization: 'You do not belong to an organization',
    login_fail_token: 'Failed to login because the token was invalid',
    verification_string_fail: 'The verification link you followed is invalid',
    register_id_missing: 'You need an identification field to register an account',
    register_email_missing: 'You need an email to register an account',
    register_id_exists: 'A user with that "$0" already exists',
    // login_fail: 'Failed to login because the token was invalid',

    // DEPRECATED (Until I retouch the measurement queries)
    not_authorized_to_view: 'You are not authorized to view this data',

    impossible_cursors: 'Only one of "after" or "before" parameter can be used',

    super_admin_param: 'Only super admins can use the "$0" parameter',

    // MongoDB Operation Errors
    update_nothing: 'There was nothing to update',

    // Program Errors
    duplicate_task_type: 'You can only add one task per type',
    invalid_schedule: 'The schedule you entered is invalid',
    invalid_duration: 'The program duration must be at least 1 day',
    overlapping_sched: 'Tasks must not have an overlapping schedule',
    min_max_error: 'Invalid minimum and maximum values',
    edit_program_not_exist: 'The program you\'re trying to edit does not exist',
    set_program_active_incomplete: 'This program could not be set active because it\'s missing some required information',

    // Enrollment Errors
    already_enrolled_to_program: 'This member is already enrolled to this program',
    non_existant_program: 'The program you requested does not exist',
    non_active_program: 'The program you requested is currently not active',
    enrolled_date_started: 'You cannot change the start date because this enrolled-program has already started',
    enrolled_date_not_started: 'You cannot set the end date of an enrolled-program that hasn\'t started',
    enrolled_invalid_end_date: 'End date must be greater than the start date/time and the current date/time',
    enrolled_incomplete_data: 'Enrolled program does not have all the necessary data for creation',
    edit_enroll_finished: 'This program cannot be edited becuase it is finished',
    edit_enroll_invalid_dates: 'The date range for this program is invalid',
    edit_enroll_started: 'Start date cannot be changed because the program has already started',
    edit_enroll_start_before_now: 'You cannot start a program before the current date',
    task_none_or_already_disabled: 'This task is already disabled or the enrolled program does not exist',
    task_none_or_already_enabled: 'This task is already enabled or the enrolled program does not exist',
    enroll_not_a_member: 'You cannot enroll a non-member to a program',

    // Date Range Errors
    start_date_is_past: 'Start date input is a date that has already passed',
    end_date_is_past: 'End date input is a date that has already passed',

    // Variable Errors
    invalid_value: '"$0" is not a valid $1',
    invalid_var_type: '"$0" must be a valid $1 type',
    required_value: '"$0" is required, you must provide this value',
    var_not_allowed: '"$0" is not allowed for "$1"',

    // Query Errors
    conflicting_params: 'You cannot query using both "$0" and "$1" parameters',

    // Measurement Errors
    measure_incomplete_device_info: 'Non-manual measurement documents must have complete device information',
    measure_incomplete_data: 'Measurement input data was incomplete',

    // Developer Errors
    dev_err_promise: 'DEVELOPER ERR: The variable in "$0" was a Promise, did you forget to resolve it?',
    dev_err_interface: 'DEVELOPER ERR: Invalid interface routing',
    dev_err_illegal_action: 'DEVELOPER ERR: This action is not permitted; "$0"',
    dev_err_impossible_scenario: 'DEVELOPER ERR: An impossible scenario happened; "$0"',
};

export default function(name) {
    // Do logging here
    // Do logging here
    // Do logging here
    let msg = ErrorMsg[name] || name;

    const err = new GraphQLError(msg);

    throw err;
};
