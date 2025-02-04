const db = require('./index')

const getAllTasks = () => {
  return db.query('SELECT * from tasks;').then((result) => result.rows)
}

const getTaskById = (id) => {
  return (
    db
      .query(`select * from tasks where id = ${id}`)
      // rows is an array of object with all tasks info
      .then((result) => result.rows)
  )
}

const getTaskByProjectId = (id) => {
  return (
    db
      .query(`select * from tasks where project_id = ${id}`)
      // rows is an array of object with all tasks info
      .then((result) => result.rows)
  )
}

const getTaskByUserId = (id) => {
  return (
    db
      .query(`select * from tasks where user_id = ${id}`)
      // rows is an array of object with all tasks info
      .then((result) => result.rows)
  )
}

// const getTasksByDueDate = (date) => {
//     return db.query('select projects.name as project_name, tasks.* from tasks inner join projects on tasks.project_id = projects.id where tasks.due_date = $1', [date])
//         .then(result => result.rows)
// }

const createTask = (
  project_id,
  user_id,
  name,
  description,
  creation_date,
  due_date,
  due_time,
  priority_level,
  status
) => {
  const sql = `INSERT INTO tasks (project_id, user_id, name, description, creation_date, due_date, due_time, priority_level, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`
  const values = [
    project_id,
    user_id,
    name,
    description,
    creation_date,
    due_date,
    due_time,
    priority_level,
    status,
  ]
  return (
    db
      .query(sql, values)
      // returns info of task created
      .then((result) => result.rows[0])
  )
}

const deleteTaskById = (id) => {
  return db.query('DELETE from tasks WHERE id = $1', [id])
}

const editTaskById = (name, description, due_date, due_time, priority_level, status, id) => {
  const valuesToUpdate = []
  let paramPosition = 2
  const params = [id]

  if (name) {
    params.push(name)
    valuesToUpdate.push(`name = $${paramPosition}`)
    paramPosition++
  }
  if (description) {
    params.push(description)
    valuesToUpdate.push(`description = $${paramPosition}`)
    paramPosition++
  }
  if (due_date) {
    params.push(due_date)
    valuesToUpdate.push(`due_date = $${paramPosition}`)
    paramPosition++
  }
  if (due_time) {
    params.push(due_time)
    valuesToUpdate.push(`due_time = $${paramPosition}`)
    paramPosition++
  }
  if (priority_level) {
    params.push(priority_level)
    valuesToUpdate.push(`priority_level = $${paramPosition}`)
    paramPosition++
  }
  if (status) {
    params.push(status)
    valuesToUpdate.push(`status = $${paramPosition}`)
    paramPosition++
  }

  const sql = `UPDATE tasks set ${valuesToUpdate.join(', ')} WHERE id =$1;`
  return db.query(sql, params)
}

const editTaskStatusById = (id, status) => {
  const sql = 'UPDATE tasks set status = $1 WHERE id = $2'
  return db.query(sql, [status, id]).then((res) => res.rowCount)
}

module.exports = {
  getAllTasks,
  getTaskById,
  deleteTaskById,
  createTask,
  editTaskById,
  getTaskByProjectId,
  editTaskStatusById,
  getTaskByUserId
  // getTasksByDueDate
}
