import mysql from 'mysql2/promise'

const { doDBQueryBuffalorugby } = useQuery()
const { getConnectionBuffalorugby } = useDBConnection()
const { sendNewsletters } = useEmail()
const { typeMatch } = useMatch()

export const newslettersService = {
  getAll,
  getAllCurrent,
  getYear,
  sendNewsletter,
  trackNewsletter,
  getOne,
  getOpenedCount,
  addOne,
  editOne,
  deleteOne,
  changeStatus,
  getRecipientTypes,
}

async function getAll() {
  const sql = `SELECT
								newsletter_id,
								newsletter_id as id,
								newsletter_recipient_type_id,
								admin_user_id,
								newsletter_subject as title,
								newsletter_sent as sent_dt,
								status,
								deleted,
								deleted_dt,
								created_dt,
								modified_dt,
								modified_dt as dt
							FROM
								inbrc_newsletters
							WHERE
								deleted = 0
							ORDER BY dt DESC`

  const newsletter = await doDBQueryBuffalorugby(sql)
  return newsletter
}

async function getAllCurrent() {
  const sql = `SELECT
								newsletter_id,
								newsletter_id as id,
								newsletter_recipient_type_id,
								admin_user_id,
								newsletter_subject as title,
								newsletter_sent as sent_dt,
								newsletter_body_html,
								status,
								deleted,
								deleted_dt,
								created_dt,
								modified_dt,
								modified_dt as dt
							FROM
								inbrc_newsletters
							WHERE
								deleted = 0
								AND
								status = 1
							ORDER BY dt DESC`

  const newsletter = await doDBQueryBuffalorugby(sql)
  return newsletter
}

async function getYear(year) {
  const sql = `SELECT
					newsletter_id,
					newsletter_id as id,
					newsletter_recipient_type_id,
					admin_user_id,
					newsletter_subject,
					newsletter_subject as title,
					newsletter_sent as sent_dt,
					status,
					deleted,
					deleted_dt,
					created_dt,
					modified_dt,
					modified_dt as dt
				FROM
					inbrc_newsletters
				WHERE
					deleted = 0
					AND
					YEAR(created_dt) = ${year}
				ORDER BY
          dt DESC`
  const newsletters = await doDBQueryBuffalorugby(sql)
  return newsletters
}

// Define function to add footer, compose and send newsletters
//
async function sendNewsletter({
  newsletter_id,
  newsletter_body_html,
  newsletter_subject,
  newsletter_recipient_type_id,
}) {
  // get all active accounts marked to receive newsletter
  const sql = `SELECT
								account_id,
								member_firstname,
								member_lastname,
								account_addr_street,
								account_addr_street_ext,
								account_addr_city,
								account_addr_state,
								account_addr_postal,
								account_addr_country,
								account_addr_phone,
								member_year,
								member_prev_club,
								member_type_id,
								member_type2_id,
								account_email,
								newsletter_recipient,
								mail_recipient,
								sms_recipient
							FROM inbrc_accounts
							WHERE deleted = 0 AND status = 1 AND newsletter_recipient = 1
							ORDER BY account_email ASC`
  const accounts = await doDBQueryBuffalorugby(sql)

  // define function to filter match member types with recipient types
  //
  function setNewsletterRecipients(accounts, recipient_type_id) {
    return accounts.filter(function (account) {
      // return newsletterTypeMemberMatch(recipient_type_id, account)
      return typeMatch(recipient_type_id, account)
    })
  }
  // Call function to make recipients list
  //
  const recipients = setNewsletterRecipients(
    accounts,
    newsletter_recipient_type_id,
  )

  //
  // // Calls server/utils/ useEmail composable sendNewsletters to send newsletters
  //
  const { success, sentlist } = await sendNewsletters(
    recipients,
    newsletter_subject,
    newsletter_body_html,
    newsletter_id,
  )

  //
  //
  //
  const sql2 = `UPDATE inbrc_newsletters
								SET
									newsletter_sent = NOW(),
									newsletter_send = NOW(),
									newsletter_send_complete = NOW(),
									newsletter_send_status = 3,
									newsletter_opened_cnt = 0,
									newsletter_recp_cnt = ${recipients.length}
								WHERE
									newsletter_id = ${newsletter_id}`

  await doDBQueryBuffalorugby(sql2)

  // return { success, fail, sentlist }
  return { success, sentlist }
}
//
//
//
async function getOne(id) {
  const sql = `select * from inbrc_newsletters where newsletter_id = ` + id
  const newsletter = await doDBQueryBuffalorugby(sql)
  return newsletter[0]
}

//
async function getOpenedCount(id) {
  const sql =
    `select count(*) as opened_cnt from inbrc_newsletter_openings where newsletter_id = ` +
    id
  const opened = await doDBQueryBuffalorugby(sql)
  return opened[0]
}

async function trackNewsletter(query) {
  // console.log('track ', query.account_id + ' ' + query.newsletter_id)
  const conn = await getConnectionBuffalorugby()

  try {
    await conn.query('START TRANSACTION')

    // update member last email opened date
    let sql = `UPDATE inbrc_accounts
					SET
						account_email_opening = NOW()
					WHERE
						account_id = ?`

    let inserts = []
    inserts.push(query.account_id)
    sql = mysql.format(sql, inserts)
    await conn.execute(sql)

    // Check if Newsletter already logged for this account in _newsletter_openings ?
    sql = `SELECT
							count(*) as cnt
						FROM
							inbrc_newsletter_openings
						WHERE
							newsletter_id = ? AND account_id = ?`

    inserts = []
    inserts.push(query.newsletter_id, query.account_id)
    sql = mysql.format(sql, inserts)
    let [rows] = await conn.execute(sql)
    let cnt = rows[0].cnt

    // IF not already counted as opened
    if (!cnt) {
      sql = `INSERT INTO inbrc_newsletter_openings
							SET
								newsletter_id = ?,
								account_id = ?,
								newsletter_opened_date = NOW()`

      inserts = []
      inserts.push(query.newsletter_id, query.account_id)
      sql = mysql.format(sql, inserts)
      await conn.execute(sql)
    }

    sql = `UPDATE inbrc_newsletters
					SET
						newsletter_opened_cnt = newsletter_opened_cnt + 1
					WHERE
						newsletter_id = ?`

    inserts = []
    inserts.push(query.newsletter_id)
    sql = mysql.format(sql, inserts)
    await conn.execute(sql)

    await conn.query('COMMIT')
    await conn.end()
    return (
      'COMMIT trackNewsletter ' + query.account_id + ' ' + query.newsletter_id
    )
  } catch (e) {
    await conn.query('ROLLBACK')
    await conn.end()
    return 'ROLLBACK ' + e
  }
}

async function addOne({
  newsletter_recipient_type_id,
  admin_user_id,
  newsletter_subject,
  newsletter_body_text,
  newsletter_body_html,
}) {
  let sql = `INSERT INTO inbrc_newsletters SET
								newsletter_recipient_type_id = ?,
                admin_user_id = ?,
                newsletter_subject = ?,
                newsletter_body_text = ?,
                newsletter_body_html = ?,
                newsletter_send_status = 0,
								status = 1,
                created_dt = NOW(),
                modified_dt= NOW()`

  let inserts = []
  inserts.push(
    newsletter_recipient_type_id,
    admin_user_id,
    newsletter_subject,
    newsletter_body_text,
    newsletter_body_html,
  )
  const newsletter = await doDBQueryBuffalorugby(sql, inserts)
  return newsletter
}

async function editOne({
  newsletter_id,
  newsletter_recipient_type_id,
  admin_user_id,
  newsletter_subject,
  newsletter_body_text,
  newsletter_body_html,
  newsletter_sent,
  newsletter_send_complete,
  newsletter_send_status,
}) {
  let sql = `UPDATE inbrc_newsletters SET
							newsletter_recipient_type_id = ?,
							admin_user_id = ?,
							newsletter_subject = ?,
							newsletter_body_text = ?,
							newsletter_body_html = ?,
							newsletter_sent = ?,
							newsletter_send_complete = ?,
							newsletter_send_status = ?,
							modified_dt= NOW()
						WHERE newsletter_id = ?`
  let inserts = []
  inserts.push(
    newsletter_recipient_type_id,
    admin_user_id,
    newsletter_subject,
    newsletter_body_text,
    newsletter_body_html,
    newsletter_sent,
    newsletter_send_complete,
    newsletter_send_status,
    newsletter_id,
  )
  const newsletter = await doDBQueryBuffalorugby(sql, inserts)

  return newsletter
}

async function deleteOne(id) {
  const conn = await getConnectionBuffalorugby()

  try {
    await conn.query('START TRANSACTION')

    let sql = `UPDATE inbrc_newsletters SET deleted=1, deleted_dt= NOW() WHERE newsletter_id = ${id}`
    await conn.execute(sql)

    sql = `UPDATE inbrc_newsletter_openings SET deleted = 1 WHERE newsletter_id = ${id}`
    await conn.execute(sql)

    await conn.query('COMMIT')
    await conn.end()
    return 'COMMIT'
  } catch (e) {
    await conn.query('ROLLBACK')
    await conn.end()
    return 'ROLLBACK ' + e
  }
}

async function changeStatus({ id, status }) {
  const sql =
    `UPDATE inbrc_newsletters SET status = "` +
    status +
    `" WHERE newsletter_id = ` +
    id
  const newsletter = await doDBQueryBuffalorugby(sql)

  return newsletter
}

async function getRecipientTypes() {
  const sql = `SELECT * FROM inbrc_newsletter_recipient_types WHERE 1`
  const recipienttypes = await doDBQueryBuffalorugby(sql)
  return recipienttypes
}
