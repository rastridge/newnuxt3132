import mysql from 'mysql2/promise'
// const CONFIG = useRuntimeConfig()

const { sendEmail } = useEmail()
const { doDBQueryBuffalorugby } = useQuery()
const { getConnectionBuffalorugby } = useDBConnection()
const { checkEmail, checkEmailAdd } = useAccountInfo()

export const accountsService = {
  getRecentUpdates,
  getAll,
  getOne,
  addOne,
  editOne,
  changeStatus,
  deleteOne,

  getOfficers,
  getWof,
  getSuggestions,

  getShow,
  getMemberTypes,
  getMemberAdminTypes,

  lookupByEmail,
}

async function lookupByEmail(email) {
  const sql = `SELECT
							account_id as id,
							account_id
						FROM
							inbrc_accounts
						WHERE
							deleted = 0
							AND
							account_email LIKE '${email}'`

  // filename messsage, variable
  // activityLog('lookupByEmail', 'sql=', sql)

  const accounts = await doDBQueryBuffalorugby(sql)
  // return accounts[0].id
  return accounts
}

async function getRecentUpdates() {
  const sql = `SELECT
									account_id,
									CONCAT(member_firstname," ", member_lastname) as name,
									modified_dt
								FROM
									inbrc_accounts
								WHERE
									deleted = 0
									AND
									STATUS = 1
									AND
									member_type_id != 13
								ORDER BY
									modified_dt DESC
								LIMIT 20`

  const recent = await doDBQueryBuffalorugby(sql)
  return recent
}

async function getAll() {
  const sql = `SELECT
									account_id as id,
									account_id,
									member_type_id,
									member_type2_id,
									member_firstname,
									member_lastname,
									CONCAT(member_firstname," ", member_lastname) as title,
									member_year,
									account_email,
									account_email_opening,
									account_textmsg_opening,
									account_addr_street,
									account_addr_street_ext,
									account_addr_city,
									account_addr_state,
									account_addr_country,
									account_addr_postal,
									account_addr_phone,
									newsletter_recipient,
									mail_recipient,
									sms_recipient,
									modified_dt,
									modified_dt as dt,
									status
							FROM inbrc_accounts
							WHERE deleted = 0
							ORDER BY member_lastname ASC`

  const accounts = await doDBQueryBuffalorugby(sql)
  return accounts
}
async function getOne(id) {
  const sql = `SELECT *
							FROM inbrc_accounts
							WHERE account_id = ?`
  const accounts = await doDBQueryBuffalorugby(sql, [id])
  let account = {}
  if (accounts.length > 0) {
    account = accounts[0]
  }
  return account
}

/***************************************** */
/*              addOne                     */
/***************************************** */
async function addOne(info) {
  //debug - next sendEmail will not wrk without this
  sendEmail(
    'ron.astridge@me.com',
    'vaccountService addOne ',
    'vaccountService addOne ',
  )

  const emailExists = await checkEmailAdd(info)
  // make sure email is lowercase
  const lc_account_email = info.account_email.toLowerCase()

  // will be returned with message if email exists
  let msg = null

  const CONN = await getConnectionBuffalorugby()
  try {
    await CONN.query('START TRANSACTION')

    // If no email conflict
    //
    if (!emailExists) {
      //
      // add record
      //
      let sql = `INSERT INTO inbrc_accounts
									SET
									account_email = ?,
									member_firstname = ?,
									member_lastname = ?,

									member_year = ?,
									account_addr_street = ?,
									account_addr_street_ext = ?,
									account_addr_city = ?,
									account_addr_state = ?,
									account_addr_country = ?,
									account_addr_postal = ?,
									account_addr_phone = ?,
									member_prev_club = ?,

									member_show_phone = ?,
									member_show_addr = ?,
									newsletter_recipient = ?,
									mail_recipient = ?,
									sms_recipient = ?,

									member_type_id = ?,
									member_type2_id = ?,
									member_admin_type_id = ?,
									member_admin_type2_id = ?,

									status = 1,
									created_dt = NOW(),
									modified_dt= NOW();`
      const {
        member_firstname,
        member_lastname,

        member_year,
        account_addr_street,
        account_addr_street_ext,
        account_addr_city,
        account_addr_state,
        account_addr_country,
        account_addr_postal,
        account_addr_phone,
        member_prev_club,

        member_show_phone,
        member_show_addr,
        newsletter_recipient,
        mail_recipient,
        sms_recipient,

        member_type_id,
        member_type2_id,
        member_admin_type_id,
        member_admin_type2_id,
      } = info
      let inserts = []
      inserts.push(
        lc_account_email,
        member_firstname,
        member_lastname,

        member_year,
        account_addr_street,
        account_addr_street_ext,
        account_addr_city,
        account_addr_state,
        account_addr_country,
        account_addr_postal,
        account_addr_phone,
        member_prev_club,

        member_show_phone,
        member_show_addr,
        newsletter_recipient,
        mail_recipient,
        sms_recipient,

        member_type_id,
        member_type2_id,
        member_admin_type_id,
        member_admin_type2_id,
      )
      sql = mysql.format(sql, inserts)
      await CONN.execute(sql)

      //
      // Compose and send individual email
      //
      const email_msg =
        'A pending membership account for ' +
        member_firstname +
        ' ' +
        member_lastname +
        '  has been created ' +
        ' with email ' +
        lc_account_email +
        ' previous club ' +
        member_prev_club
      // this worked with add new
      const email_list = [
        'ron.astridge@icloud.com',
        'ron.astridge@me.com',
        'ron@astridgehome.org',
        // 'j.qualey@yahoo.com',
        // 'cnrehlers@gmail.com',
        // 'lexmaccubbin@yahoo.com',
        // 'owen.lawther26@gmail.com',
      ]
      // notify interested parties
      for (const email of email_list) {
        sendEmail(
          email,
          'Buffalo Rugby Club Member Account Creation',
          email_msg,
        )
      }
    } else {
      msg = `An account with email ${lc_account_email} already exists`
    }

    await CONN.query('COMMIT')
    await CONN.end()
    return { message: msg }
  } catch (e) {
    await CONN.query('ROLLBACK')
    await CONN.end()
    return 'ROLLBACK ' + e
  }
}

/***************************************** */
/*               editOne                   */
/***************************************** */
async function editOne(info) {
  const emailExists = await checkEmail(info)
  let msg = null // will be returned with message if email exists
  // make sure email is lowercase
  const lc_account_email = info.account_email.toLowerCase()

  const CONN = await getConnectionBuffalorugby()
  try {
    await CONN.query('START TRANSACTION')

    if (!emailExists) {
      let sql = `UPDATE inbrc_accounts
							SET
									account_email = ?,
									member_firstname = ?,
									member_lastname = ?,

									member_year = ?,
									account_addr_street = ?,
									account_addr_street_ext = ?,
									account_addr_city = ?,
									account_addr_state = ?,
									account_addr_country = ?,
									account_addr_postal = ?,
									account_addr_phone = ?,
									member_prev_club = ?,

									member_show_phone = ?,
									member_show_addr = ?,
									newsletter_recipient = ?,
									mail_recipient = ?,
									sms_recipient = ?,

									member_wall_of_fame_year = ?,
									member_pic_path = ?,

									member_type_id = ?,
									member_type2_id = ?,
									member_admin_type_id = ?,
									member_admin_type2_id = ?,
									modified_dt= NOW()
								WHERE account_id = ?;`
      const {
        member_firstname,
        member_lastname,

        member_year,
        account_addr_street,
        account_addr_street_ext,
        account_addr_city,
        account_addr_state,
        account_addr_country,
        account_addr_postal,
        account_addr_phone,
        member_prev_club,

        member_show_phone,
        member_show_addr,
        newsletter_recipient,
        mail_recipient,
        sms_recipient,

        member_wall_of_fame_year,
        member_pic_path,

        member_type_id,
        member_type2_id,
        member_admin_type_id,
        member_admin_type2_id,

        account_id,
      } = info

      let inserts = []
      inserts.push(
        lc_account_email,
        member_firstname,
        member_lastname,

        member_year,
        account_addr_street,
        account_addr_street_ext,
        account_addr_city,
        account_addr_state,
        account_addr_country,
        account_addr_postal,
        account_addr_phone,
        member_prev_club,

        member_show_phone,
        member_show_addr,
        newsletter_recipient,
        mail_recipient,
        sms_recipient,

        member_wall_of_fame_year,
        member_pic_path,

        member_type_id,
        member_type2_id,
        member_admin_type_id,
        member_admin_type2_id,

        account_id,
      )

      sql = mysql.format(sql, inserts)
      await CONN.execute(sql)
    } else {
      msg = 'Account with email ' + lc_account_email + ' already exists'
    }

    await CONN.query('COMMIT')
    await CONN.end()

    return { message: msg }
  } catch (e) {
    await CONN.query('ROLLBACK')
    await CONN.end()
    return 'ROLLBACK ' + e
  }
}

async function deleteOne(id) {
  let message = null
  const conn = await getConnectionBuffalorugby()
  try {
    await conn.query('START TRANSACTION')

    //
    // check for games played
    // if so do not delete
    //
    let sql = `SELECT
				count(*) as played
			FROM
				inbrc_stats_player
			WHERE
				(player_id = ${id} OR replaced_by = ${id}) AND deleted = 0;`
    let inserts = []
    sql = mysql.format(sql, inserts)
    const games = await conn.execute(sql)
    const played = games[0][0].played
    if (played === 0) {
      sql = `UPDATE inbrc_accounts
							SET
									deleted = '1',
									deleted_dt= NOW()
								WHERE account_id = ?;`
      inserts = []
      inserts.push(id)
      sql = mysql.format(sql, inserts)
      await conn.execute(sql)

      sql = `UPDATE inbrc_newsletter_openings
							SET
									deleted = '1'
								WHERE account_id = ?;`
      inserts = []
      inserts.push(id)
      sql = mysql.format(sql, inserts)
      await conn.execute(sql)
    } else {
      message = 'Member is on a game roster, cannot delete'
    }

    await conn.query('COMMIT')
    await conn.end()
    return message
  } catch (e) {
    await conn.query('ROLLBACK')
    await conn.end()
    return 'ROLLBACK ' + e
  }
}

async function changeStatus({ id, status }) {
  const sql = `UPDATE inbrc_accounts
							SET
									status = ?,
									deleted_dt= NOW()
								WHERE account_id = ?;`
  let inserts = []
  inserts.push(status, id)
  const accounts = await doDBQueryBuffalorugby(sql, inserts)
  return accounts
}

async function getShow() {
  const sql = `SELECT
									a.account_id,
									a.account_email,
									a.member_firstname,
									a.member_lastname,
									CONCAT(
											a.member_firstname,
											' ',
											a.member_lastname
									) AS NAME,
									a.member_position,
									a.member_year,
									a.member_prev_club,
									a.member_wall_of_fame_year,
									a.member_type_id,
									mt.member_type,
									(
									SELECT
											COUNT(p.player_id)
									FROM
											inbrc_stats_player p,
											inbrc_accounts ac,
											inbrc_stats_games g
									WHERE
											ac.account_id = a.account_id AND p.player_id = a.account_id AND p.game_id = g.game_id AND g.game_type_id <> 8 AND g.game_type_id <> 7
							) AS fifteensct,
							(
									SELECT
											COUNT(p.player_id)
									FROM
											inbrc_stats_player p,
											inbrc_accounts ac,
											inbrc_stats_games g
									WHERE
											ac.account_id = a.account_id AND p.player_id = a.account_id AND p.game_id = g.game_id AND g.game_type_id <> 8 AND g.game_type_id = 7 AND g.game_type_id <> 8
							) AS sevensct
							FROM
									inbrc_accounts a,
									inbrc_member_types mt
							WHERE
									a.member_type_id NOT IN('13') AND a.STATUS = 1 AND a.deleted = 0 AND a.member_type_id = mt.member_type_id
							ORDER BY a.member_lastname ASC`

  const accounts = await doDBQueryBuffalorugby(sql)
  return accounts
}

async function getOfficers() {
  const sql = `SELECT
									a.account_id,
									account_id as id,
									account_email,
									CONCAT(member_firstname," ", member_lastname) as title,
									account_addr_phone as phone,
									g.member_admin_type as office,
									h.member_admin_type as office2
								FROM
									inbrc_accounts a,
									inbrc_member_admin_types h,
									inbrc_member_admin_types g
								WHERE
									a.member_admin_type_id = g.member_admin_type_id
									AND a.member_admin_type2_id = h.member_admin_type_id
									AND ((a.member_admin_type_id > 0) OR (a.member_admin_type2_id > 0 ))
									AND a.deleted = 0
									AND a.STATUS = 1
								ORDER BY
									a.member_admin_type_id`

  const officers = await doDBQueryBuffalorugby(sql)
  return officers
}

async function getWof() {
  const sql = `SELECT
								account_id as id,
								account_id,
								CONCAT(member_firstname," ",member_lastname) AS name,
								member_wall_of_fame_year,
								member_pic_path
							FROM
									inbrc_accounts
							WHERE
									member_wall_of_fame_year != ''
									AND deleted = 0
									AND Status = 1
							ORDER BY member_wall_of_fame_year`

  const wof = await doDBQueryBuffalorugby(sql)
  return wof
}

async function getSuggestions() {
  const sql = `SELECT
									account_id,
									member_firstname,
									member_lastname,
									CONCAT(member_firstname," ", member_lastname) as title
							FROM inbrc_accounts
							WHERE deleted = 0 AND status = 1
							ORDER BY member_lastname ASC`

  const accounts = await doDBQueryBuffalorugby(sql)
  return accounts
}

async function getMemberTypes() {
  const sql = `SELECT * FROM inbrc_member_types WHERE 1 ORDER BY member_type`
  const membertypes = await doDBQueryBuffalorugby(sql)
  return membertypes
}
async function getMemberAdminTypes() {
  const sql = `SELECT * FROM inbrc_member_admin_types WHERE 1`
  const memberadmintypes = await doDBQueryBuffalorugby(sql)
  return memberadmintypes
}
