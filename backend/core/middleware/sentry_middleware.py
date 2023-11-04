from sentry_sdk import capture_exception

class Sentry400Middleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if 400 <= response.status_code < 500:
            error_message = self.get_error_message(response)
            capture_exception(Exception(f"HTTP {response.status_code} error: {request.path}\n{error_message}"))
        return response

    def get_error_message(self, response):
        try:
            error_data = response.data  # If you're using a serializer or framework that provides a "data" attribute for responses
            return str(error_data)
        except AttributeError:
            # If "data" is not available, fall back to the response content
            return response.content.decode("utf-8")