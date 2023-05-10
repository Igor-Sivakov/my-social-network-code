export const findObjInArray = (
  items: any,
  objPropName: any,
  actionProps: any,
  newObjProps: any
) => {
  return items.map((obj: any) => {
    if (obj[objPropName] === actionProps) {
      return { ...obj, ...newObjProps }
    }
    return obj
  })
}
