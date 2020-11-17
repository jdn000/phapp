INSERT INTO
    ${ schema~ }.calification (
        calification_objective_id,
        alumn_id,
        subject_id,
        value,
        is_cummulative
    )
VALUES
    (
        ${calificationObjectiveId},
        ${alumnId},
        ${subjectId},
        ${value},
        ${isCummulative}
    ) 
    RETURNING 

    id, 
    calification_objective_id AS "calificationObjectiveId",
    alumn_id AS "alumnId",
    subject_id AS "subjectId",
    value,
    is_cummulative AS "isCummulative"

