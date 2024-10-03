
export class TextUtil {
  public static isUUID (text: string): boolean {
    return new RegExp('\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b').test(text)
  }

  public static parseAuthAndAuthErrors(error: string) : string {
    const regex1 = /[a-zA-Z0-9 {}\r\n\[\]:,\.\<\>\"]*BadHttpRequestException:/;
    const newErr = error.replace(regex1, "");
    const regex2 = /at RobDroneGO[a-zA-Z0-9 {}\r\n\[\]:,\.\<\>\(\)\\_\|\`&=-{}"\/-]*/;
    const finalErr = newErr.replace(regex2, "");

    return finalErr;
  }
}