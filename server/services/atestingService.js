const { doDBQueryTZ0 } = useQuery()
const { sendEmail } = useEmail()
const CONFIG = useRuntimeConfig()

export const atestingService = {
  getAll,
  getOne,
  editOne,
  addOne,
  send,
}

async function send(email) {
  /*   sendEmail(
    'ron.astridge@me.com',
    'votesService sendBallot ',
    'votesService sendBallot ',
  ) */

  const htmlBody =
    '<h1>from send</h1>' +
    '<h2>Heads up: </h2><h2>There may be more than one available question on which to vote. If so, the next question will come up when the current one is submitted.</h2>' +
    '<h2>Your vote is final once you hit Submit</h2>' +
    '<h2>You can read the choices, Cancel and come back later to finish if you like</h2>' +
    `<h2><a href="${CONFIG.public.HOST}/voting/form/` +
    email +
    '">Start Voting Here</></h2>'

  await sendEmail(email, 'Testing', htmlBody)

  return 'from send() email = ' + email
}

async function getAll() {
  return 'It works'
}

async function getOne(id) {
  const sql =
    `SELECT
				*
			FROM
					atesting
			WHERE
				id = ` + id

  const results = await doDBQueryTZ0(sql)
  return results[0]
}

/* async function addOne() {
	const sql = `INSERT INTO atesting () value ()`

	const results = await doDBQueryTZ0(sql)
	return results
} */

async function addOne({ datetime_type }) {
  const sql = `INSERT INTO atesting SET
								datetime_type = ?`
  let inserts = []
  inserts.push(datetime_type)
  const results = await doDBQueryTZ0(sql, inserts)
  return results
}

async function editOne({ id, datetime_type }) {
  const sql = `UPDATE atesting SET
								datetime_type = ?
							WHERE event_id = ?`

  let inserts = []
  inserts.push(datetime_type, id)

  const results = await doDBQueryTZ0(sql, inserts)
  return results
}
