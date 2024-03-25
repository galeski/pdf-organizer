/**
 * Create html file info template. Consumed by frontend.
 *
 * @argument {string} userName - user name to read from upload folder
 * @argument {string} fileName - file name to read from upload folder
 */
function generateFileInfo(fileName, content) {
  return {
    fileName: fileName,
    content: content || "no file content found",
  };
}

export default generateFileInfo;
