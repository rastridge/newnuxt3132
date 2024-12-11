const { doDBQueryBuffalorugby } = useQuery()

export default function useAccountInfo() {
  async function checkEmail(info) {
    console.log('info= ', info)

    // check for other users with proposed email address
    let sql = `SELECT  account_email, account_id FROM inbrc_accounts WHERE deleted = 0 AND account_id <> ${info.account_id}`
    const temp = await doDBQueryBuffalorugby(sql)
    // returns undefined if not found
    // returns record if found
    const emailExists = temp.find((u) => {
      return u.account_email.toLowerCase() === info.account_email.toLowerCase()
    })
    // console.log('emailexists = ', emailExists)
    return emailExists
  }

  async function checkEmailAdd(info) {
    // console.log('info= ', info)

    // check for other users with proposed email address
    let sql = `SELECT  account_email, account_id FROM inbrc_accounts WHERE deleted = 0`
    const temp = await doDBQueryBuffalorugby(sql)
    // returns undefined if not found
    // returns record if found
    const emailExists = temp.find((u) => {
      return u.account_email.toLowerCase() === info.account_email.toLowerCase()
    })
    console.log('emailexists = ', emailExists)
    return emailExists
  }
  return {
    checkEmail,
    checkEmailAdd,
  }
}
