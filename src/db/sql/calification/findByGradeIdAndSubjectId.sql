SELECT
    ca.id,
    c.id AS "calificationId", 
    ca.alumn_id AS "alumnId",
    c.subject_id AS "subjectId",
    c.grade_id AS "gradeId",
    ca.value,
    c.is_cummulative AS "isCummulative",
    c.objective_id AS "objectiveId",
    c.evaluation_number AS "evaluationNumber"
    
FROM ${ schema~ }.calification c
INNER JOIN ${ schema~ }.alumn_calification ca
ON c.id=ca.id_calification
WHERE c.grade_id = ${gradeId} AND c.subject_id = ${subjectId}
