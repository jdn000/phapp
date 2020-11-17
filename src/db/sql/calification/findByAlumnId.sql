SELECT
    id, 
    calification_objective_id AS "calificationObjectiveId",
    alumn_id AS "alumnId",
    subject_id AS "subjectId",
    value,
    is_cummulative AS "isCummulative"

FROM ${ schema~ }.calification 
WHERE alumn_id = ${alumn_id}
