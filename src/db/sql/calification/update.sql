UPDATE
    ${schema~}.calification
SET
        calification_objective_id = ${calificationObjectiveId},
        alumn_id = ${alumnId},
        subject_id =  ${subjectId},
     
        value = ${value},
        is_cummulative = ${isCummulative}
WHERE 
    id = ${id} 

RETURNING 
    id, 
    calification_objective_id AS "calificationObjectiveId",
    alumn_id AS "alumnId",
    subject_id AS "subjectId",
    value,
    is_cummulative AS "isCummulative"

