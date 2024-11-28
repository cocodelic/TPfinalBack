class ErrorResponseBuilder{
    response = {
        error: '',
        code: ''
    }
    setError(error){
        this.error = error
        return this
    }
    setCode(code){
        this.code = code
        return this
    }
    build(){
        return this.response
    }
}

export default ErrorResponseBuilder