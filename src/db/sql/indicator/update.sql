UPDATE
    ${schema~}.indicator
SET
    name = ${name},
    description = ${description},
    objective_id = ${objectiveId},
    status=${status}
WHERE 
    id = ${id} 

RETURNING 
    id,
    name,
    description,
    objective_id AS "objectiveId",
    status
    