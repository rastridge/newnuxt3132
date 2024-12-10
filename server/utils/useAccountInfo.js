const { doDBQueryBuffalorugby } = useQuery()
// use composable within composable?

export default function useAccountInfo() {
  async function emailExists(accounts) {
    // check for other users with proposed email address
    let sql = `SELECT * FROM inbrc_accounts WHERE deleted = 0 AND account_id <> ${accounts.account_id}`
    const others = await doDBQueryBuffalorugby(sql)
    // let msg = null // will be returned with message if email exists
    const lc_account_email = accounts.account_email.toLowerCase()
    const exists = others.find(
      (u) => u.account_email.toLowerCase() === lc_account_email,
    )
    return exists
  }
  return {
    emailExists,
  }
}
