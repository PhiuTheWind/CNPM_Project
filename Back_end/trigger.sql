DROP TRIGGER IF EXISTS `before_insert_request`;

DELIMITER $$

CREATE TRIGGER `before_insert_request`
BEFORE INSERT ON `Request`
FOR EACH ROW
BEGIN
    -- Calculate the next request_id for the given student_send
    DECLARE next_request_id INT;

    -- Get the maximum request_id for the current student_send
    SELECT IFNULL(MAX(request_id), 0) + 1
    INTO next_request_id
    FROM Request
    WHERE student_send = NEW.student_send;

    -- Assign the calculated request_id to the new row
    SET NEW.request_id = next_request_id;
END$$

DELIMITER ;