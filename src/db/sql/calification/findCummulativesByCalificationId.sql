SELECT
    id,
    alumn_id AS "alumnId",
    subject_id AS "subjectId",
    grade_id AS "gradeId",
    calification_id AS "calificationId",
    value,
    evaluation_number AS "evaluationNumber"
FROM ${ schema~ }.cummulative_calification 
WHERE calification_id = ${calificationId}
