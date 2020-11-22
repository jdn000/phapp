INSERT INTO
    ${ schema~ }.calification (
  
        alumn_id,
        subject_id,
        value,
        is_cummulative,
        objective_id
    )
VALUES
    (
     
        ${alumnId},
        ${subjectId},
        ${value},
        ${isCummulative},
        ${objectiveId}
    ) 
    RETURNING 

    id, 
    alumn_id AS "alumnId",
    subject_id AS "subjectId",
    value,
    is_cummulative AS "isCummulative",
    objective_id AS "objectiveId"

