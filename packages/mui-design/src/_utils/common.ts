/*
 * @Author: haoxiaojun 
 * @Date: 2022-02-03 18:02:39 
 * @Details:  通用工具类
 * @Last Modified by:   haoxiaojun 
 * @Last Modified time: 2022-02-03 18:02:39 
 */
export function isValidKey(object: object, key: string | number | symbol ): key is keyof typeof object {
  return key in object;
}
