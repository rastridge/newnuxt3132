import dayjs from 'dayjs'

export default function useUnixtime() {
  const convertToUnixtime = async (dt) => {
    const ut = dayjs.unix(dt)
    return ut
  }
  const convertToDatetime = async (ut) => {
    // add 10 years to unixtimestamp
    // convert unixt to datetime and subtract 10 years from datetime
    const dt = dayjs(dayjs.unix(dayjs.unix(ut).add(10, 'years')))
      .subtract(10, 'year')
      .format()
    return dt
  }

  // const formatUnixDate = (ut) => dayjs.unix(ut).format('ddd MMMM D YYYY')
  const formatUnixDate = (ut) => dayjs.unix(ut).format('ddd MMM D, YYYY')

  // const formatUnixTime = async (ut) => dayjs.unix(ut).format('h:mm A')
  const formatUnixTime = (ut) => dayjs.unix(ut).format('h:mm A')

  // const formatUnixDate = (ut) => dayjs.unix(ut).format('ddd MMMM D YYYY')
  const convertToFormkitDate = (ut) => dayjs.unix(ut).format('YYYY-MM-DD')

  // const formatUnixTime = async (ut) => dayjs.unix(ut).format('h:mm A')
  const convertToFormkitTime = (ut) => dayjs.unix(ut).format('HH:mm')

  return {
    convertToUnixtime,
    convertToDatetime,
    formatUnixDate,
    formatUnixTime,
    convertToFormkitDate,
    convertToFormkitTime,
  }
}
