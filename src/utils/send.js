/**
 * 防止重發(短時多次操作進行無效代碼)
 * 項目對於操作不敏感可以不用開啟=>消耗一些性能而已
 * 項目對於操作敏感建議開啟
 * @param {*} delay 延遲毫秒數 
 * @param {*} callback 回調函數
 * @returns 
 */
export function debounce (delay, callback) {
  let task
  return function () {
    clearTimeout(task)
    task = setTimeout(() => {
      callback.apply(this, arguments)
    }, delay)
  }
}