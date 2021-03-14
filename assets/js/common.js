
export const getToday = () => {
  const today = new Date()
  const month = today.getMonth() + 1
  return `${today.getFullYear()}-${month > 9 ? month : '0'+ month}-${today.getDate()}`
}

export function validateRoute () {
  if(!window.localStorage.getItem('token')) {
    this.$router.push('login/?message=noUser')
  }
}
