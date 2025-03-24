package stu.edu.vn.backend_spring.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> handleResponseStatusException(ResponseStatusException ex) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("message", ex.getReason()); 
        return new ResponseEntity<>(errorBody, ex.getStatusCode());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleOtherExceptions(Exception ex) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("message", "Lỗi không xác định: " + ex.getMessage());
        return new ResponseEntity<>(errorBody, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
