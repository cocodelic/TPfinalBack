class AppError extends Error{
    constructor(message, status_code, validationErrors){
        super(message)
        this.status_code = status_code
        this.status = String(status_code).startsWith('4') ? 'fail' : 'error'
        this.validationErrors = validationErrors || null

        this.is_operational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError


