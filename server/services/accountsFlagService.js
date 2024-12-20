const CONFIG = useRuntimeConfig()

const { sendEmail } = useEmail()
const { doDBQueryBuffalorugby } = useQuery()
const { checkEmailFlag, checkEmailAddFlag } = useAccountInfo()

export const accountsFlagService = {
  getAll,
  getOne,
  addOne,
  editOne,
  changeStatus,
  deleteOne,
  addFlagByRegister,
}

async function getAll() {
  const sql = `SELECT
								account_id as id,
								account_id,
								member_type_id,
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
						FROM inbrc_accounts_flag
						WHERE deleted = 0 AND ( member_type_id IN (11,12,15))
						ORDER BY member_lastname ASC`

  const accounts = await doDBQueryBuffalorugby(sql)
  return accounts
}

async function getOne(id) {
  const sql = `SELECT
								account_id,
								account_pass,
								account_email_opening,
								account_textmsg_opening,

								last_login_dt,
								STATUS,
								deleted,
								deleted_dt,
								created_dt,
								modified_dt,

								member_guardian,
								member_dob,
								member_gender,
								flag_legal,
								flag_photo,

								account_email,
								member_firstname,
								member_lastname,

								account_addr_street,
								account_addr_street_ext,
								account_addr_city,
								account_addr_state,
								account_addr_country,
								account_addr_postal,

								member_year,

								account_addr_phone,
								member_show_phone,
								member_show_addr,
								newsletter_recipient,
								mail_recipient,
								sms_recipient,

								member_type_id
							FROM
								inbrc_accounts_flag
							WHERE
								account_id = ${id}`

  const account = await doDBQueryBuffalorugby(sql)
  return account[0]
}

/***************************************** */
/*              addOne                     */
/***************************************** */

async function addOne(info) {
  // check for existing email
  const emailExists = await checkEmailAddFlag(info)
  // make sure email is lowercase
  const lc_account_email = info.account_email.toLowerCase()
  let msg = null // will be returned with message if email exists */

  if (!emailExists) {
    const sql = `INSERT INTO inbrc_accounts_flag
							SET
								member_guardian = ?,
								member_dob = ?,
								member_gender = ?,
								flag_legal = ?,
								flag_photo = ?,

								account_email = ?,
								member_firstname = ?,
								member_lastname = ?,

								account_addr_street = ?,
								account_addr_street_ext = ?,
								account_addr_city = ?,
								account_addr_state = ?,
								account_addr_country = ?,
								account_addr_postal = ?,

								member_year = ?,
								member_type_id = ?,

								account_addr_phone = ?,
								member_show_phone = ?,
								member_show_addr = ?,
								newsletter_recipient = ?,
								mail_recipient = ?,
								sms_recipient = ?,


								STATUS = 1,
								deleted = 0,
								created_dt = NOW(),
								modified_dt = NOW()`

    const {
      member_guardian,
      member_dob,
      member_gender,
      flag_legal,
      flag_photo,

      member_firstname,
      member_lastname,

      account_addr_street,
      account_addr_street_ext,
      account_addr_city,
      account_addr_state,
      account_addr_country,
      account_addr_postal,

      member_year,
      member_type_id,

      account_addr_phone,
      member_show_phone,
      member_show_addr,
      newsletter_recipient,
      mail_recipient,
      sms_recipient,
    } = info

    let inserts = []
    inserts.push(
      member_guardian,
      member_dob,
      member_gender,
      flag_legal,
      flag_photo,

      lc_account_email,
      member_firstname,
      member_lastname,

      account_addr_street,
      account_addr_street_ext,
      account_addr_city,
      account_addr_state,
      account_addr_country,
      account_addr_postal,

      member_year,
      member_type_id,

      account_addr_phone,
      member_show_phone,
      member_show_addr,
      newsletter_recipient,
      mail_recipient,
      sms_recipient,
    )
    await doDBQueryBuffalorugby(sql, inserts)

    const success =
      '<h3>An Buffalo Rugby Club youth flag rugby account for ' +
      member_firstname +
      ' ' +
      member_lastname +
      '  has been created with email = ' +
      lc_account_email +
      '</h3>'

    await sendEmail(
      CONFIG.TO_FLAG,
      'Buffalo Rugby Club Flag Account Creation',
      success,
    )
  } else {
    msg = 'Account with email ' + lc_account_email + ' already exists'
  }

  return { message: msg }
}

async function addFlagByRegister(info) {
  // check for existing email
  const emailExists = await checkEmailAddFlag(info)
  // make sure email is lowercase
  const lc_account_email = info.account_email.toLowerCase()
  let msg = null // will be returned with message if email exists */

  if (!emailExists) {
    // let hashedpassword = md5(account_remind).substring(3,11)

    const sql = `INSERT INTO inbrc_accounts_flag
							SET
								member_guardian = ?,
								member_dob = ?,
								member_gender = ?,
								flag_legal = ?,
								flag_photo = ?,

								account_email = ?,
								member_firstname = ?,
								member_lastname = ?,

								account_addr_street = ?,
								account_addr_street_ext = ?,
								account_addr_city = ?,
								account_addr_state = ?,
								account_addr_country = ?,
								account_addr_postal = ?,

								member_year = ?,

								account_addr_phone = ?,
								member_show_phone = ?,
								member_show_addr = ?,
								newsletter_recipient = ?,
								mail_recipient = ?,
								sms_recipient = ?,

								member_type_id = '12',

								STATUS = 1,
								deleted = 0,
								created_dt = NOW(),
								modified_dt = NOW()`
    const {
      member_guardian,
      member_dob,
      member_gender,
      flag_legal,
      flag_photo,

      account_email,
      member_firstname,
      member_lastname,

      account_addr_street,
      account_addr_street_ext,
      account_addr_city,
      account_addr_state,
      account_addr_country,
      account_addr_postal,

      member_year,

      account_addr_phone,
      member_show_phone,
      member_show_addr,
      newsletter_recipient,
      mail_recipient,
      sms_recipient,
    } = info
    let inserts = []
    inserts.push(
      member_guardian,
      member_dob,
      member_gender,
      flag_legal,
      flag_photo,

      account_email,
      member_firstname,
      member_lastname,

      account_addr_street,
      account_addr_street_ext,
      account_addr_city,
      account_addr_state,
      account_addr_country,
      account_addr_postal,

      member_year,

      account_addr_phone,
      member_show_phone,
      member_show_addr,
      newsletter_recipient,
      mail_recipient,
      sms_recipient,
    )
    await doDBQueryBuffalorugby(sql, inserts)

    const success =
      '<h3>An Buffalo Rugby Club youth flag rugby account for ' +
      member_firstname +
      ' ' +
      member_lastname +
      '  has been created with email = ' +
      account_email +
      '</h3>'

    await sendEmail(
      CONFIG.TO_FLAG,
      'Buffalo Rugby Club Flag Account Creation',
      success,
    )
  } else {
    msg = 'Account with email ' + lc_account_email + ' already exists'
  }

  return { message: msg }
}

/***************************************** */
/*               editOne                   */
/***************************************** */

async function editOne(info) {
  // check for existing email
  const emailExists = await checkEmailFlag(info)
  // make sure email is lowercase
  const lc_account_email = info.account_email.toLowerCase()
  let msg = null // will be returned with message if email exists */

  if (!emailExists) {
    const sql = `UPDATE inbrc_accounts_flag
						SET
							member_guardian = ?,
							member_dob = ?,
							member_gender = ?,
							member_type_id = ?,
							flag_legal = ?,
							flag_photo = ?,
							account_email = ?,
							member_firstname = ?,
							member_lastname = ?,
							account_addr_street = ?,
							account_addr_street_ext = ?,
							account_addr_city = ?,
							account_addr_state = ?,
							account_addr_country = ?,
							account_addr_postal = ?,
							member_year = ?,
							account_addr_phone = ?,
							member_show_phone = ?,
							member_show_addr = ?,
							newsletter_recipient = ?,
							mail_recipient = ?,
							sms_recipient = ?,
							modified_dt= NOW()
						WHERE account_id = ?`
    const {
      member_guardian,
      member_dob,
      member_gender,
      member_type_id,
      flag_legal,
      flag_photo,

      account_email,
      member_firstname,
      member_lastname,

      account_addr_street,
      account_addr_street_ext,
      account_addr_city,
      account_addr_state,
      account_addr_country,
      account_addr_postal,

      member_year,

      account_addr_phone,
      member_show_phone,
      member_show_addr,
      newsletter_recipient,
      mail_recipient,
      sms_recipient,
      account_id,
    } = info
    let inserts = []
    inserts.push(
      member_guardian,
      member_dob,
      member_gender,
      member_type_id,
      flag_legal,
      flag_photo,

      account_email,
      member_firstname,
      member_lastname,

      account_addr_street,
      account_addr_street_ext,
      account_addr_city,
      account_addr_state,
      account_addr_country,
      account_addr_postal,

      member_year,

      account_addr_phone,
      member_show_phone,
      member_show_addr,
      newsletter_recipient,
      mail_recipient,
      sms_recipient,
      account_id,
    )

    await doDBQueryBuffalorugby(sql, inserts)
  } else {
    msg = 'Account with email ' + lc_account_email + ' already exists'
  }
  return { message: msg }
}

async function deleteOne(id) {
  const sql = `UPDATE inbrc_accounts_flag
								SET
									deleted = '1',
									deleted_dt= NOW()
								WHERE account_id = ?;`
  let inserts = []
  inserts.push(id)
  const accounts = await doDBQueryBuffalorugby(sql, inserts)
  return accounts
}

async function changeStatus({ id, status }) {
  const sql = `UPDATE inbrc_accounts_flag
								SET
									status = ?,
									deleted_dt= NOW()
								WHERE account_id = ?;`
  let inserts = []
  inserts.push(status, id)
  const accounts = await doDBQueryBuffalorugby(sql, inserts)
  return accounts
}
