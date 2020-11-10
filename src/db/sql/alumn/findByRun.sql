SELECT
    run, 
    names,
    last_name AS "lastName",
    second_surname AS "secondSurname",
    grade_id AS "gradeId" 
FROM ${ schema~ }.alumn 
WHERE
    run = ${run}