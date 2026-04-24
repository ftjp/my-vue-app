
/**
 * 统一响应结构（后端标准格式）
 */
export class ApiResponse {
  constructor({ code, message, result, success, timestamp }) {
    this.code = code        // 200 成功
    this.message = message  // 操作成功！
    this.result = result    // 实际业务数据
    this.success = success  // true/false
    this.timestamp = timestamp
  }

  // 判断是否成功
  isSuccess() {
    return this.code === 200 && this.success === true
  }
}